import Decimal from 'decimal.js';
import { SerializableWithReference, SerializeOn } from '@/classes/game/base/serialization';

export abstract class Measure extends SerializableWithReference {
  protected abstract compute(): Decimal;

  @SerializeOn('emit')
  get value() {
    return this.compute();
  }
}
