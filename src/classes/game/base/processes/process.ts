import { Mutation, Calculable, ValidationOptions, CalculationOptions } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { LimitFlag } from '@/classes/game/base/stats';
import { Effect } from '@/classes/game/base/modifiers';
import { Transformable } from '@/classes/game/base/transformable';
import { State } from '@/classes/game/state';

export type ProcessableDescriptorType = 'mutation' | 'effect';

export interface MutationDescriptor {
  type: 'mutation';
  ignoreLimits: LimitFlag[];
}

export interface EffectDescriptor {
  type: 'effect';
  durationFunc?: (effect: Effect) => Decimal;
}

export type ConditionFunction = (process: Process, opts: ValidationOptions) => boolean;

// Rename to Conditional?
export interface Condition {
  conditionFunc: ConditionFunction;
}

export type ProcessableDescriptorMap = Map<string, MutationDescriptor | EffectDescriptor>;

export abstract class Process extends Transformable implements Calculable {
  static descriptorsOfProcessables: ProcessableDescriptorMap = new Map();
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
    for (const { mutation } of this.mutations()) {
      mutation.calculate(opts);
    }

    for (const { effect, descriptor } of this.effects()) {
      if (descriptor && descriptor.durationFunc) {
        this.state.timers.push(effect, descriptor.durationFunc(effect));
      }
    }
  }

  *mutations(): IterableIterator<{ descriptor: MutationDescriptor | undefined, mutation: Calculable }> {
    for (const { name, node } of this.children<Calculable>(entry => entry instanceof Mutation)) {
      // Will always be a MutationDescriptor, since we filtering only instanceof Mutation
      const descriptor = this.constructor.descriptorsOfProcessables.get(name) as MutationDescriptor | undefined;
      yield { descriptor, mutation: node };
    }
  }

  *effects(): IterableIterator<{ descriptor: EffectDescriptor | undefined, effect: Effect }> {
    for (const { name, node } of this.children<Effect>(entry => entry instanceof Effect)) {
      // Will always be a MutationDescriptor, since we filtering only instanceof Effect
      const descriptor = this.constructor.descriptorsOfProcessables.get(name) as EffectDescriptor | undefined;
      yield { descriptor, effect: node };
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
