import Decimal from 'decimal.js';
import { SerializableWithReference, SerializeOn } from '@/classes/game/base/serialization';

export class Modifier extends SerializableWithReference {
  private computeFunc: () => Decimal;

  constructor(computeFunc: () => Decimal) {
    super();
    this.computeFunc = computeFunc;
  }

  @SerializeOn('emit')
  get value() {
    let cumulated = this.computeFunc();

    for (const timer of this.state.timers) {
      if (timer.effect.modifier === this) {
        cumulated = cumulated.add(timer.effect.value);
      }
    }

    return cumulated;
  }
}
