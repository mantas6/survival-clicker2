import { Decimal } from 'decimal.js';
import { Stat } from './stat';

type MaximumFunction = () => Decimal;

export class Container extends Stat {
  private maximumFunction: MaximumFunction;

  constructor(defaultValue: number | string, maximumFunction: MaximumFunction) {
    super(defaultValue);
    this.maximumFunction = maximumFunction;
  }

  get maximum(): Decimal {
    const currentMaximum = this.maximumFunction();

    return currentMaximum;
  }
}
