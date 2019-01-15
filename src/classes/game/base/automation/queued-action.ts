import { Action } from '@/classes/game/base/actions';
import Decimal from 'decimal.js';
import { Serializable, SerializeOn } from '@/classes/game/base/serialization';
import { CalculationOptions } from '@/classes/game/base/mutations';

interface QueuedOptions {
  interval: Decimal;
}

export class QueuedAction extends Serializable {
  @SerializeOn('emit', 'store')
  readonly action: Action;

  @SerializeOn('emit', 'store')
  interval: Decimal;

  @SerializeOn('emit', 'store')
  elapsed: Decimal;

  constructor(action: Action, opts: QueuedOptions) {
    super();
    this.action = action;
    this.interval = opts.interval;
    this.elapsed = new Decimal(0);
  }

  calculate(opts: CalculationOptions) {
    const elapsed = this.elapsed.add(opts.multiplier);

    if (elapsed.greaterThanOrEqualTo(this.interval)) {
      this.elapsed = new Decimal(0);

      this.calculateAction(opts);
    } else {
      this.elapsed = elapsed;
    }
  }

  private calculateAction(opts: CalculationOptions) {
    if (this.action.validate(opts)) {
      this.action.calculate(opts);
    }
  }
}
