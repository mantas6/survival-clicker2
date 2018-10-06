import { StateNode } from '@/classes/game/base/state-node';

export interface SerializedNode {
  [ propertyName: string ]: SerializedNode | string | number;
}

export interface PropertyTagDescriptor {
  tagNames: string[];
  serializeFunc?: (input: any) => string | number;
  unserializeFunc?: (input: string | number) => any;
}

export type PropertyTagDescriptorMap = Map<string, PropertyTagDescriptor>;

export type TagName = 'emit' | 'store';

type ConstructorProperty = () => void;

export type PropertyTagIterator = IterableIterator<{
  name: string,
  node: Serializable | number | string | ConstructorProperty,
  descriptor?: PropertyTagDescriptor,
}>;

export abstract class Serializable extends StateNode {
  // Rename this to be more serializable specific?
  public static descriptorsOfProperties: PropertyTagDescriptorMap = new Map();
  public static defaultTagNames: string[] = [];
  public 'constructor': typeof Serializable;

  public serialize(tagName: TagName) {
    const serialized: SerializedNode = {};

    for (const { name, node, descriptor } of this.propertiesWithTag(tagName)) {
      if (descriptor && descriptor.serializeFunc) {
        serialized[name] = descriptor.serializeFunc(node);
      } else {
        if (node instanceof Serializable) {
          serialized[name] = node.serialize(tagName);
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

  protected *propertiesWithTag(tagName: TagName): PropertyTagIterator {
    // Iterating through children of the class, that is its properties
    for (const { name, node } of this.childrenWithNames<Serializable>()) {
      const descriptor = this.constructor.descriptorsOfProperties.get(name);

      const property = { name, node, descriptor };

      if (descriptor && descriptor.tagNames.includes(tagName)) {
        yield property;
      } else if (this.constructor.defaultTagNames.includes(tagName)) {
        yield property;
      }
    }

    // Iterating through methods of the class, so that getters and/or functions can be serialized
    for (const [ name, descriptor ] of this.constructor.descriptorsOfProperties ) {
      const ctor = this.constructor as { [propertyName: string]: any };
      const node = ctor[name] as () => ConstructorProperty;

      if (node) {
        yield { name, node, descriptor };
      }
    }
  }

  protected getPropertyByName(propertyName: string): Serializable | number | string | undefined {
    return (this as any)[propertyName];
  }
}
