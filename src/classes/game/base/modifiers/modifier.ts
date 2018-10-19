import Decimal from 'decimal.js';
import { Serializable, SerializeOn } from '@/classes/game/base/serialization';

export class Modifier extends Serializable {
  private computeFunc: () => Decimal;

  constructor(computeFunc: () => Decimal) {
    super();
    this.computeFunc = computeFunc;
  }

  @SerializeOn('emit')
  get value() {
    return this.computeFunc();
  }
}
