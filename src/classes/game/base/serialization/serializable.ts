import { StateNode } from '@/classes/game/base/state-node';

export interface SerializedNode {
  [ propertyName: string ]: SerializedNode | string | number;
}

export interface PropertySerializeOnDescriptor {
  SerializeOnNames: string[];
  serializeFunc?: (input: any) => string | number;
  unserializeFunc?: (input: string | number) => any;
}

export type PropertySerializeOnDescriptorMap = Map<string, PropertySerializeOnDescriptor>;

export type SerializeOnName = 'emit' | 'store';

export type PropertySerializeOnIterator = IterableIterator<{
  name: string,
  node: Serializable | number | string,
  descriptor?: PropertySerializeOnDescriptor,
}>;

export abstract class Serializable extends StateNode {
  // Rename this to be more serializable specific?
  public static descriptorsOfProperties: PropertySerializeOnDescriptorMap = new Map();
  public static defaultSerializeOnNames: string[] = [];
  public 'constructor': typeof Serializable;

  public serialize(SerializeOnName: SerializeOnName) {
    const serialized: SerializedNode = {};

    for (const { name, node, descriptor } of this.propertiesWithSerializeOn(SerializeOnName)) {
      if (descriptor && descriptor.serializeFunc) {
        serialized[name] = descriptor.serializeFunc(node);
      } else {
        if (node instanceof Serializable) {
          serialized[name] = node.serialize(SerializeOnName);
        } else {
          serialized[name] = node.toString();
        }
      }
    }

    return serialized;
  }

  public unserialize(serialized: SerializedNode) {
    for (const [ name, serializedValue ] of Object.entries(serialized)) {
      const node = this.getPropertyByName(name);

      const descriptor = this.constructor.descriptorsOfProperties.get(name);

      if (typeof serializedValue === 'string' || typeof serializedValue === 'number') {
        if (descriptor && descriptor.unserializeFunc) {
          (this as any)[name] = descriptor.unserializeFunc(serializedValue);
        }
      } else if (node instanceof Serializable) {
        node.unserialize(serializedValue);
      }
    }
  }

  protected *propertiesWithSerializeOn(SerializeOnName: SerializeOnName): PropertySerializeOnIterator {
    for (const { name, node } of this.childrenWithNames<Serializable>()) {
      const descriptor = this.constructor.descriptorsOfProperties.get(name);

      const property = { name, node, descriptor };

      if (descriptor && descriptor.SerializeOnNames.includes(SerializeOnName)) {
        yield property;
      } else if (this.constructor.defaultSerializeOnNames.includes(SerializeOnName)) {
        yield property;
      }
    }
  }

  protected getPropertyByName(propertyName: string): Serializable | number | string | undefined {
    return (this as any)[propertyName];
  }
}
