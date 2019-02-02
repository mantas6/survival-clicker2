import { Mutation, Calculable, ValidationOptions, CalculationOptions } from '@/classes/game/base/mutations';
import { LimitFlag } from '@/classes/game/base/stats';
import { TimerEffect, Effect } from '@/classes/game/base/modifiers';
import { Transformable, Transform } from '@/classes/game/base/transformable';
import { SerializeAllOn, SerializeOn } from '@/classes/game/base/serialization';

export type ProcessableDescriptorType = 'mutation' | 'effect';

export interface MutationDescriptor {
  type: 'mutation';
  ignoreLimits: LimitFlag[];
}

export interface EffectDescriptor {
  type: 'effect';
}

export type ConditionFunction = (process: Process, opts: ValidationOptions) => boolean;

// Rename to Conditional?
export interface Condition {
  conditionFunc: ConditionFunction;
}

export type ProcessableDescriptorMap = Map<string, MutationDescriptor | EffectDescriptor>;

interface MutationEntry {
  name: string;
  descriptor: MutationDescriptor | undefined;
  mutation: Mutation<any>;
}

@SerializeAllOn('emit')
export abstract class Process extends Transformable implements Calculable {
  static descriptorsOfProcessables: ProcessableDescriptorMap = new Map();
  static conditions: Condition[] = [];

  @Transform('clock', () => false)
  isCalculated: boolean = false;

  @SerializeOn('emit')
  get fullPath() {
    return this.path;
  }

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
    this.isCalculated = true;

    for (const { mutation } of this.mutations()) {
      mutation.calculate(opts);
    }

    for (const { effect } of this.timerEffects()) {
      this.state.timers.push({
        effect,
        duration: effect.duration,
        multiplier: opts.multiplier,
      });
    }
  }

  *mutations(): IterableIterator<MutationEntry> {
    for (const { name, node } of this.children<Mutation<any>>(entry => entry instanceof Mutation)) {
      // Will always be a MutationDescriptor, since we filtering only instanceof Mutation
      const descriptor = this.constructor.descriptorsOfProcessables.get(name) as MutationDescriptor | undefined;
      yield { descriptor, mutation: node, name };
    }
  }

  *timerEffects(): IterableIterator<{ descriptor: EffectDescriptor | undefined, effect: TimerEffect, name: string }> {
    for (const { name, node } of this.children<TimerEffect>(entry => entry instanceof TimerEffect)) {
      // Will always be a MutationDescriptor, since we filtering only instanceof Effect
      const descriptor = this.constructor.descriptorsOfProcessables.get(name) as EffectDescriptor | undefined;
      yield { descriptor, effect: node, name };
    }
  }

  *effects(): IterableIterator<{ descriptor: EffectDescriptor | undefined, effect: Effect, name: string }> {
    for (const { name, node } of this.children<Effect>(entry => entry instanceof Effect)) {
      // Will always be a MutationDescriptor, since we filtering only instanceof Effect
      const descriptor = this.constructor.descriptorsOfProcessables.get(name) as EffectDescriptor | undefined;
      yield { descriptor, effect: node, name };
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
