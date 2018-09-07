import { Decimal } from 'decimal.js';

export abstract class Value {
  public abstract default: number | string;
  private current?: Decimal;

  get value(): Decimal {
    if (this.current === undefined) {
      this.current = new Decimal(this.default);
    }

    return this.current;
  }
}
