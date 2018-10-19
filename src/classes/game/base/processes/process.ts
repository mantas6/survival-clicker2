import { SerializableWithReference } from '@/classes/game/base/serialization';
import { Effect, Calculable } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';
import { ProbeFlag } from '@/classes/game/base/stats';
import { ValidationOptions } from '../effects/effect';

export enum ProcessType {
    Manual = 'manual',
    Auto = 'auto',
}

export interface EffectDescriptor {
  duration?: Decimal;
  ignoreLimits: ProbeFlag[];
}

export type EffectDescriptorMap = Map<string, EffectDescriptor>;

export abstract class Process extends SerializableWithReference {
  static type: ProcessType = ProcessType.Auto;
  static descriptorsOfEffects: EffectDescriptorMap = new Map();
  'constructor': typeof Process;

  validate(): boolean {
    for (const { effect, descriptor } of this.effects()) {
      const opts: ValidationOptions = {};

      if (descriptor) {
        opts.ignoreLimits = descriptor.ignoreLimits;
      }

      if (!effect.validate(opts)) {
        return false;
      }
    }

    return true;
  }

  calculate() {
    for (const { effect } of this.effects()) {
      effect.calculate();
    }
  }

  // Rename this method to match Process child classes
  *effects(): IterableIterator<{ descriptor: EffectDescriptor | undefined, effect: Calculable }> {
    for (const { name, node } of this.childrenWithNames<Calculable>(entry => entry instanceof Effect)) {
      const descriptor = this.constructor.descriptorsOfEffects.get(name);
      yield { descriptor, effect: node };
    }
  }
}
