import { SerializableWithReference } from '@/classes/game/base/serialization';
import { Mutation, Calculable, ValidationOptions, CalculationOptions } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { LimitFlag } from '@/classes/game/base/stats';

export interface MutationDescriptor {
  durationFunc?: () => Decimal;
  ignoreLimits: LimitFlag[];
}

export type ConditionFunction = (process: Process, opts: ValidationOptions) => boolean;

// Rename to Conditional?
export interface Condition {
  conditionFunc: ConditionFunction;
}

export type MutationDescriptorMap = Map<string, MutationDescriptor>;

export abstract class Process extends SerializableWithReference implements Calculable {
  static descriptorsOfMutations: MutationDescriptorMap = new Map();
  static conditions: Condition[] = [];

  'constructor': typeof Process;

  validate(opts: ValidationOptions): boolean {
    if (!this.validateConditions(opts)) {
      return false;
    }

    if (!this.validateMutations(opts)) {
      return false;
    }

    return true;
  }

  calculate(opts: CalculationOptions) {
    for (const { mutation, descriptor } of this.mutations()) {
      if (descriptor && descriptor.durationFunc) {
        this.state.timers.push(mutation, descriptor.durationFunc);
      } else {
        mutation.calculate(opts);
      }
    }
  }

  // Rename this method to match Process child classes
  *mutations(): IterableIterator<{ descriptor: MutationDescriptor | undefined, mutation: Calculable }> {
    for (const { name, node } of this.children<Calculable>(entry => entry instanceof Mutation)) {
      const descriptor = this.constructor.descriptorsOfMutations.get(name);
      yield { descriptor, mutation: node };
    }
  }

  protected validateMutations(opts: ValidationOptions): boolean {
    for (const { mutation, descriptor } of this.mutations()) {
      const mutationOpts: ValidationOptions = { multiplier: opts.multiplier };

      if (descriptor) {
        mutationOpts.ignoreLimits = descriptor.ignoreLimits;
      }

      if (!mutation.validate(mutationOpts)) {
        return false;
      }
    }

    return true;
  }

  protected validateConditions(opts: ValidationOptions): boolean {
    for (const condition of this.constructor.conditions) {
      if (!condition.conditionFunc(this, opts)) {
        return false;
      }
    }

    return true;
  }
}
