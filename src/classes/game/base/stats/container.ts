import { Decimal } from 'decimal.js';
import { Value, MutationFunction } from './value';

export abstract class Container extends Value {
  abstract get maximum(): Decimal;

  public mutate(mutateFunc: MutationFunction) {
    const mutated = mutateFunc(this.value);

    if (mutated.lessThan(this.minimum)) {
      this.current = new Decimal(this.minimum);
    } else if (mutated.greaterThan(this.maximum)) {
      this.current = this.maximum;
    } else {
      this.current = mutated;
    }
  }
}
