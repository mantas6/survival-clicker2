import { SerializableWithReference } from '@/classes/game/base/serialization';
import { Effect, Calculable, ValidationOptions, CalculationOptions } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';
import { LimitFlag } from '@/classes/game/base/stats';

export interface EffectDescriptor {
  durationFunc?: () => Decimal;
  ignoreLimits: LimitFlag[];
}

export type ConditionFunction = (process: Process, opts: ValidationOptions) => boolean;

// Rename to Conditional?
export interface Condition {
  conditionFunc: ConditionFunction;
}

export type EffectDescriptorMap = Map<string, EffectDescriptor>;

export abstract class Process extends SerializableWithReference implements Calculable {
  static descriptorsOfEffects: EffectDescriptorMap = new Map();
  static conditions: Condition[] = [];

  'constructor': typeof Process;

  validate(opts: ValidationOptions): boolean {
    if (!this.validateConditions(opts)) {
      return false;
    }

    if (!this.validateEffects(opts)) {
      return false;
    }

    return true;
  }

  calculate(opts: CalculationOptions) {
    for (const { effect, descriptor } of this.effects()) {
      if (descriptor && descriptor.durationFunc) {
        this.state.timers.push(effect, descriptor.durationFunc);
      } else {
        effect.calculate(opts);
      }
    }
  }

  // Rename this method to match Process child classes
  *effects(): IterableIterator<{ descriptor: EffectDescriptor | undefined, effect: Calculable }> {
    for (const { name, node } of this.children<Calculable>(entry => entry instanceof Effect)) {
      const descriptor = this.constructor.descriptorsOfEffects.get(name);
      yield { descriptor, effect: node };
    }
  }

  protected validateEffects(opts: ValidationOptions): boolean {
    for (const { effect, descriptor } of this.effects()) {
      const effectOpts: ValidationOptions = { multiplier: opts.multiplier };

      if (descriptor) {
        effectOpts.ignoreLimits = descriptor.ignoreLimits;
      }

      if (!effect.validate(effectOpts)) {
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
