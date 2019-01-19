import Decimal from 'decimal.js';
import { Serializable, SerializeOn } from '@/classes/game/base/serialization';
import { CalculationOptions } from '@/classes/game/base/mutations';

interface QueuedOptions {
  interval: Decimal;
}

export class Queued extends Serializable {
  @SerializeOn('emit', 'store')
  interval: Decimal;

  @SerializeOn('emit', 'store')
  elapsed: Decimal;

  constructor(opts: QueuedOptions) {
    super();
    this.interval = opts.interval;
    this.elapsed = new Decimal(0);
  }

  shouldCalculate(opts: CalculationOptions): boolean {
    const elapsed = this.elapsed.add(opts.multiplier);

    if (elapsed.greaterThanOrEqualTo(this.interval)) {
      this.elapsed = new Decimal(0);

      return true;
    } else {
      this.elapsed = elapsed;

      return false;
    }
  }
}
