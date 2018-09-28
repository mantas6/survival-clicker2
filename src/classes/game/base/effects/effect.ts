import { SerializableWithReference } from '@/classes/game/base/serialization';
import { Decimal } from 'decimal.js';

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
}
