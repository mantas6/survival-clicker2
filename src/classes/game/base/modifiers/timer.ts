import { CalculationOptions } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { Effect } from '@/classes/game/base/modifiers';
import { Serializable, SerializeOn, SerializeAs, UnserializeAs } from '@/classes/game/base/serialization';

export interface TimerOptions {
  effect: Effect;
  duration: Decimal;
  multiplier: Decimal;
  timePassed?: Decimal;
}

export class Timer extends Serializable {
  @SerializeOn('emit', 'store')
  effect: Effect;

  @SerializeOn('emit', 'store')
  @UnserializeAs(input => new Decimal(input.toString()))
  multiplier: Decimal;

  @SerializeOn('emit', 'store')
  @UnserializeAs(input => new Decimal(input.toString()))
  private duration: Decimal;

  @SerializeOn('emit', 'store')
  @UnserializeAs(input => new Decimal(input.toString()))
  private timePassed = new Decimal(0);

  constructor(opts: TimerOptions) {
    super();
    this.effect = opts.effect;
    this.duration = opts.duration;
    this.multiplier = opts.multiplier;

    // When un-serializing
    if (opts.timePassed) {
      this.timePassed = opts.timePassed;
    }
  }

  calculate(opts: CalculationOptions) {
    this.timePassed = this.timePassed.add(opts.multiplier);
  }

  hasTimedOut() {
    return this.timePassed.greaterThan(this.duration);
  }
}
