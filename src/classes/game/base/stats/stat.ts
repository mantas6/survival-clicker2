import { Decimal } from 'decimal.js';

export interface StatOptions {
  /** Default or starting value */
  default: number | string;
}

export class Stat {
  private current: Decimal;

  constructor(config: StatOptions) {
    this.current = new Decimal(config.default);
  }

  get value(): Decimal {
    return this.current;
  }
}
