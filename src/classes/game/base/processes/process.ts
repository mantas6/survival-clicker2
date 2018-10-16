import { SerializableWithReference } from '@/classes/game/base/serialization';
import { Effect, Calculable } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';

export enum ProcessType {
    Manual = 'manual',
    Auto = 'auto',
}

export interface EffectDescriptor {
  duration?: Decimal;
}

export type EffectDescriptorMap = Map<string, EffectDescriptor>;

export abstract class Process extends SerializableWithReference {
  static type: ProcessType = ProcessType.Auto;
  static descriptorsOfEffects: EffectDescriptorMap = new Map();
  'constructor': typeof Process;

  validate(): boolean {
    for (const effect of this.effects()) {
      if (!effect.validate()) {
        return false;
      }
    }

    return true;
  }

  calculate() {
    for (const effect of this.effects()) {
      effect.calculate();
    }
  }

  // Rename this method to match Process child classes
  *effects(): IterableIterator<Calculable> {
    for (const child of this.children<Calculable>(entry => entry instanceof Effect)) {
      yield child;
    }
  }
}
