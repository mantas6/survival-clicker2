import { Decimal } from 'decimal.js';
import { Type } from 'class-transformer';


export class Stat {
  @Type(() => Decimal)
  public value: Decimal;

  constructor(defaultValue: Decimal) {
    this.value = defaultValue;
  }

  get maximum() {
    return 0;
  }
}
