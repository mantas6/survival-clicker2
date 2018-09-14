import { Decimal } from 'decimal.js';
import { StateNode } from '@/classes/game/base/state-node';

interface SerializedValue {
  current: string;
}

type SerializedData = SerializedValue | undefined;

export abstract class Value extends StateNode {
  public abstract default: number | string;
  private current?: Decimal;

  get value(): Decimal {
    if (this.current === undefined) {
      this.current = new Decimal(this.default);
    }

    return this.current;
  }

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
}
