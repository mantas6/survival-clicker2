import { SerializableWithReference } from '@/classes/game/base/serialization';

interface PropertyDescriptor {
  group: number;
}

export class Effect extends SerializableWithReference {
  // public static descriptorsOfProperties = new Map<string, PropertyDescriptor>();
  // public 'constructor': typeof Effect;

  // Time that this effect is active for
  public elapsed: number = 0;

}
