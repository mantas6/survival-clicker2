import { Decimal } from 'decimal.js';

export class Stat {
  private current: Decimal;

  constructor(defaultValue: number | string) {
    this.current = new Decimal(defaultValue);
  }

  get value(): Decimal {
    return this.current;
  }
}
