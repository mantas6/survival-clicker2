import Decimal from 'decimal.js';
import { SerializableWithReference, SerializeOn } from '@/classes/game/base/serialization';

export abstract class Modifier extends SerializableWithReference {
  protected abstract compute(cumulated: Decimal): Decimal;

  @SerializeOn('emit')
  get value() {
    let cumulated = new Decimal(0);

    for (const timer of this.state.timers) {
      if (timer.effect.modifier === this) {
        const multiplier = timer.multiplier;
        cumulated = cumulated.add(timer.effect.compute({ multiplier }));
      }
    }

    return this.compute(cumulated);
  }
}
