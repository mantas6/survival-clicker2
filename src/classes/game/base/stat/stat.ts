import { Decimal } from 'decimal.js';

export interface StatOptions {
  defaultValue: number | string;
}

export class Stat {
  private current: Decimal;

  constructor(config: StatOptions) {
    this.current = new Decimal(config.defaultValue);
  }

  get value(): Decimal {
    return this.current;
  }
}
