import { Decimal } from 'decimal.js';
import { Value, MutationFunction } from './value';
import { SerializeOn } from '../serialization';
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

  @SerializeOn('emit')
  get max() {
    return this.maximum;
  }

  /**
   * Check and trigger whenMaximum if needed
   */
  triggerWhenMaximum(): void {
    if (this.value.equals(this.maximum)) {
      this.whenMaximum();
    }
  }

  /**
   * Is triggered when value ceils to the maximum after mutation
   */
  protected onGreaterThanMaximum(): void {
    //
  }

  /**
   * Is triggered when value stays at a maximum
   */
  protected whenMaximum(): void {
    //
  }
}
