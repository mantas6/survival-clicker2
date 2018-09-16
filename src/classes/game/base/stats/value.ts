import { Decimal } from 'decimal.js';
import { Serializable, Filter, Tag } from '@/classes/game/base/serializable';

interface SerializedValue {
  current: string;
}

type SerializedData = SerializedValue | undefined;

export abstract class Value extends Serializable {
  public abstract default: number | string;

  @Tag('emit')
  @Filter((value: Decimal) => value.toString())
  private current?: Decimal;

  get value(): Decimal {
    if (this.current === undefined) {
      this.current = new Decimal(this.default);
    }

    return this.current;
  }

  set value(value: Decimal) {
    this.current = value;
  }
}
