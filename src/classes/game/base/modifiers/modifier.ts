import Decimal from 'decimal.js';
import { SerializableWithReference, SerializeOn } from '@/classes/game/base/serialization';

export class Modifier extends SerializableWithReference {
  private computeFunc: (cumulated: Decimal) => Decimal;

  constructor(computeFunc: (cumulated: Decimal) => Decimal) {
    super();
    this.computeFunc = computeFunc;
  }

  @SerializeOn('emit')
  get value() {
    let cumulated = new Decimal(0);

    for (const timer of this.state.timers) {
      if (timer.effect.modifier === this) {
        cumulated = cumulated.add(timer.effect.value);
      }
    }

    return this.computeFunc(cumulated);
  }
}
