import { CalculationOptions } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { Effect } from '@/classes/game/base/modifiers';
import { Serializable, SerializeOn, SerializeAs, UnserializeAs } from '@/classes/game/base/serialization';

export class Timer extends Serializable {
  @SerializeOn('emit', 'store')
  @SerializeAs<Effect>(input => input.path)
  effect: Effect;

  @SerializeOn('emit', 'store')
  @UnserializeAs(input => new Decimal(input.toString()))
  private duration: Decimal;

  @SerializeOn('emit', 'store')
  @UnserializeAs(input => new Decimal(input.toString()))
  private timePassed = new Decimal(0);

  constructor(effect: Effect, duration: Decimal, timePassed?: Decimal) {
    super();
    this.effect = effect;
    this.duration = duration;

    // When un-serializing
    if (timePassed) {
      this.timePassed = timePassed;
    }
  }

  calculate(opts: CalculationOptions) {
    this.timePassed = this.timePassed.add(opts.multiplier);
  }

  hasTimedOut() {
    return this.timePassed.greaterThan(this.duration);
  }
}
