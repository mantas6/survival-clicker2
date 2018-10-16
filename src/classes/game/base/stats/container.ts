import { Decimal } from 'decimal.js';
import { Value, MutationFunction } from './value';
import { SerializeOn } from '../serialization';
import { ProbeFlag } from '.';

export abstract class Container extends Value {
  abstract get maximum(): Decimal;

  mutate(mutateFunc: MutationFunction) {
    const mutated = mutateFunc(this.value);

    if (mutated.lessThan(this.minimum)) {
      this.current = new Decimal(this.minimum);
    } else if (mutated.greaterThan(this.maximum)) {
      this.current = this.maximum;
    } else {
      this.current = mutated;
    }
  }

  probe(mutateFunc: MutationFunction): ProbeFlag {
    const mutated = mutateFunc(this.value);

    if (mutated.lessThan(this.minimum)) {
      return 'lessThanMinimum';
    } else if (mutated.greaterThan(this.maximum)) {
      return 'greaterThanMaximum';
    }

    return true;
  }

  @SerializeOn('emit')
  get max() {
    return this.maximum;
  }
}
