import { Calculable } from '@/classes/game/base/processes/effect';
import { SerializableWithReference } from '@/classes/game/base/serialization';
import { Effect } from './effect';
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
  public static type: ProcessType = ProcessType.Manual;
  public static descriptorsOfEffects: EffectDescriptorMap = new Map();
  public 'constructor': typeof Process;

  public validate(): boolean {
    return true;
  }

  public calculate() {
    for (const effect of this.effects()) {
      effect.calculate();
    }
  }

  // Rename this method to match Process child classes
  public *effects(): IterableIterator<Calculable> {
    for (const child of this.children<Calculable>(entry => entry instanceof Effect)) {
      yield child;
    }
  }
}
