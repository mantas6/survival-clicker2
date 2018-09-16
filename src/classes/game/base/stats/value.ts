import { Decimal } from 'decimal.js';
import { Serializable, Tag } from '@/classes/game/base/serializable';

interface SerializedValue {
  current: string;
}

type SerializedData = SerializedValue | undefined;

export abstract class Value extends Serializable {
  public abstract default: number | string;
  @Tag('emit')
  private current?: Decimal;

  get value(): Decimal {
    if (this.current === undefined) {
      this.current = new Decimal(this.default);
    }

    return this.current;
  }
  /*
  public serialize(): SerializedData {
    if (this.current) {
      return { current: this.current.toString() };
    }
  }

  public parse(serialized: SerializedData) {
    if (serialized) {
      this.current = new Decimal(serialized.current);
    }
  }
  */
}
