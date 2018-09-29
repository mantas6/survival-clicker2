import { SerializableWithReference } from '@/classes/game/base/serialization';
import { Decimal } from 'decimal.js';
import { Calculable } from '@/classes/game/base/processes/mutation';
import { Mutation } from 'vuex-module-decorators';

export interface PropertyDescriptor {
  groupIndex?: number;
  durationFunc?: () => Decimal;
}

export type PropertyDescriptorMap = Map<string, PropertyDescriptor>;

export class Effect extends SerializableWithReference {
  public static descriptorsOfMutations: PropertyDescriptorMap = new Map();
  public 'constructor': typeof Effect;

  // Time that this effect is active for
  public elapsed: number = 0;

  public calculate() {
    for (const mutation of this.mutations()) {
      mutation.calculate();
    }
  }

  public *mutations(): IterableIterator<Calculable> {
    for (const child of this.children<Calculable>(entry => entry instanceof Mutation)) {
      yield child;
    }
  }
}
