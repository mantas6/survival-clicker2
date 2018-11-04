import { Decimal } from 'decimal.js';
import { Value } from './value';
import { SerializeOn } from '../serialization';
import { MutationFunction } from '@/classes/game/base/mutations';
import { LimitFlag } from '.';

export abstract class Container extends Value {
  abstract get maximum(): Decimal;

  mutate(mutateFunc: MutationFunction) {
    const mutated = mutateFunc(this.value);

    if (mutated.lessThan(this.minimum)) {
      this.current = new Decimal(this.minimum);

      this.onLessThanMinimum();
    } else if (mutated.greaterThan(this.maximum)) {
      this.current = this.maximum;

      this.onGreaterThanMaximum();
    } else {
      this.current = mutated;
    }
  }

  probe(mutateFunc: MutationFunction): LimitFlag {
    const mutated = mutateFunc(this.value);

    if (mutated.lessThan(this.minimum)) {
      return 'lessThanMinimum';
    } else if (mutated.greaterThan(this.maximum)) {
      return 'greaterThanMaximum';
    }

    return true;
  }

  getMaxMultiplier(diff: Decimal): Decimal {
    if (diff.isNeg()) {
      return this.value.minus(this.minimum).div(diff.negated());
    } else {
      return this.maximum.minus(this.value).div(diff);
    }
  }

  @SerializeOn('emit')
  get max() {
    return this.maximum;
  }

  /**
   * Is triggered when value ceils to the maximum after mutation
   */
  protected onGreaterThanMaximum(): void {
    //
  }
}
