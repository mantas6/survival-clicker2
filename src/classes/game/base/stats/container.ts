import { Decimal } from 'decimal.js';
import { Value, ValueOptions } from '@/classes/game/base/stats/value';

type MaximumFunction = () => Decimal;

export interface ContainerOptions extends ValueOptions {
  /** Maximum value descriptor function */
  maximum: MaximumFunction;
}

export class Container extends Value {
  private maximumFunction: MaximumFunction;

  constructor(options: ContainerOptions) {
    super(options);
    this.maximumFunction = options.maximum;
  }

  get maximum(): Decimal {
    const currentMaximum = this.maximumFunction();

    return currentMaximum;
  }
}
