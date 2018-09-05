import { Decimal } from 'decimal.js';

export interface ValueOptions {
  /** Default or starting value */
  default: number | string;
}

export class Value {
  private current: Decimal;

  constructor(options: ValueOptions) {
    this.current = new Decimal(options.default);
  }

  get value(): Decimal {
    return this.current;
  }
}
