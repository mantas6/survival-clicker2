import { StateNode } from '@/classes/game/base/state-node';

export interface SerializedNode {
  [ propertyName: string ]: SerializedNode | string | number;
}

export interface PropertyDescriptor {
  tagNames: string[];
  serializeFunc?: (input: any) => string | number;
  unserializeFunc?: (input: string | number) => any;
}

export type PropertyDescriptorMap = Map<string, PropertyDescriptor>;

export type TagName = 'emit' | 'store';

type ConstructorProperty = () => void;

export type PropertyTagIterator = IterableIterator<{
  name: string,
  node: Serializable | ConstructorProperty | string | number | undefined,
  descriptor?: PropertyDescriptor,
}>;

export abstract class Serializable extends StateNode {
  // Rename this to be more serializable specific?
  static descriptorsOfProperties: PropertyDescriptorMap = new Map();
  static defaultTagNames: string[] = [];
  'constructor': typeof Serializable;

  serialize(tagName: TagName): SerializedNode | undefined {
    const serialized: SerializedNode = {};

    for (const { name, node, descriptor } of this.serializableProperties(tagName)) {
      if (descriptor && descriptor.serializeFunc) {
        serialized[name] = descriptor.serializeFunc(node);
      } else {
        if (node instanceof Serializable) {
          const serializedNode = node.serialize(tagName);

          if (serializedNode !== undefined) {
            serialized[name] = serializedNode;
          }
        } else if (node) {
          /**
           * Will no serialized property that is set to undefined,
           * meaning that un-serialization won't reset this property.
           * To solve this state needs to be reset before un-serializing
           */
          serialized[name] = node.toString();
        }
      }
    }

    return serialized;
  }

  unserialize(serialized: SerializedNode) {
    for (const { name, node, descriptor } of this.serializableProperties('store')) {
      const serializedValue = serialized[name];

      if (typeof serializedValue === 'string' || typeof serializedValue === 'number') {
        if (descriptor && descriptor.unserializeFunc) {
          (this as any)[name] = descriptor.unserializeFunc(serializedValue);
        }
      } else if (node instanceof Serializable) {
        node.unserialize(serializedValue);
      }
    }
  }

  protected *serializableProperties(tagName: TagName): PropertyTagIterator {
    const ownPropertyNames = [];
    // Iterating through children of the class, that is its properties
    for (const { name, node } of this.children<Serializable>()) {
      const descriptor = this.constructor.descriptorsOfProperties.get(name);

      const property = { name, node, descriptor };

      ownPropertyNames.push(name);

      if (descriptor && descriptor.tagNames.includes(tagName)) {
        yield property;
      } else if (this.constructor.defaultTagNames.includes(tagName)) {
        yield property;
      }
    }

    // Iterating through methods of the class, so that getters and/or functions can be serialized
    for (const [ name, descriptor ] of this.constructor.descriptorsOfProperties ) {
      if (ownPropertyNames.includes(name)) {
        continue;
      }

      const ctx = this as { [propertyName: string]: any };
      const node = ctx[name] as () => ConstructorProperty;

      if (node && descriptor.tagNames.includes(tagName)) {
        yield { name, node, descriptor };
      }
    }
  }
}
