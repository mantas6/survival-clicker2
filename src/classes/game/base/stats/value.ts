import { Decimal } from 'decimal.js';
import { StateNode } from '@/classes/game/base/state-node';

export abstract class Value extends StateNode {
  public abstract default: number | string;
  private current?: Decimal;

  get value(): Decimal {
    if (this.current === undefined) {
      this.current = new Decimal(this.default);
    }

    return this.current;
  }
}
