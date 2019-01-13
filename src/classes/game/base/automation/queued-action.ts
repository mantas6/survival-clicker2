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

  constructor(action: Action, opts: QueuedOptions) {
    super();
    this.action = action;
    this.interval = opts.interval;
  }

  calculate(opts: CalculationOptions) {
    //
  }
}
