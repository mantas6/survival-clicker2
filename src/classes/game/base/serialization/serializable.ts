import { StateNode, NonChild } from '@/classes/game/base/state-node';
import { isPrimitive } from '@/utils/guard';
import { isEmpty } from '@/utils/method';

export type BasicValue = string | number | boolean;
export type ArrayValue = string[] | number[];

export interface SerializedNode {
  [ propertyName: string ]: SerializedNode | BasicValue | ArrayValue | undefined;
}

export interface PropertyDescriptor {
  tagNames?: string[];
  serializeFunc?: (input: any) => BasicValue | ArrayValue;
  unserializeFunc?: (input: BasicValue) => any;
}

export type PropertyDescriptorMap = Map<string, PropertyDescriptor>;

export type TagName = 'emit' | 'store';

type ConstructorProperty = () => void;

export type PropertyTagIterator = IterableIterator<{
  name: string,
  node: Serializable | ConstructorProperty | BasicValue | undefined,
  descriptor?: PropertyDescriptor,
}>;

export abstract class Serializable extends StateNode {
  // Rename this to be more serializable specific?
  static descriptorsOfProperties: PropertyDescriptorMap = new Map();
  static defaultTagNames: string[] = [];
  'constructor': typeof Serializable;

  get shouldSerializeOnEmit(): boolean {
    return true;
  }

  get shouldSerializeOnStore(): boolean {
    return true;
  }

  emitUpdate(origin?: Serializable) {
    if (!origin) {
      origin = this;
    }

    if (this.parent && this.parent instanceof Serializable) {
      this.parent.emitUpdate(origin);
    }
  }

  serialize(tagName: TagName): SerializedNode | undefined {
    if (tagName === 'emit' && !this.shouldSerializeOnEmit || tagName === 'store' && !this.shouldSerializeOnStore) {
      return undefined;
    }

    const serialized: SerializedNode = {};

    for (const { name, node, descriptor } of this.serializableProperties(tagName)) {
      if (descriptor && descriptor.serializeFunc) {
        // If it has a serialization override function, it will use it first
        serialized[name] = descriptor.serializeFunc(node);
      } else if (node !== undefined) {
        // However if it does not, then it will check if it's a standard serializable child
        if (node instanceof Serializable) {
          const serializedNode = node.serialize(tagName);

          // Skipping undefined values
          // This is used when serialize function is overridden in the child class
          if (serializedNode !== undefined) {
            serialized[name] = serializedNode;
          }
        } else if (node instanceof Array) {
          serialized[name] = node;
        } else if (isPrimitive(node)) {
          // If node is a primitive
          serialized[name] = node;
        } else {
          // If it's other object
          serialized[name] = node.toString();
        }
      }
    }

    if (!isEmpty(serialized)) {
      return serialized;
    }
  }

  unserialize(serialized: SerializedNode) {
    for (const { name, node, descriptor } of this.serializableProperties('store')) {
      const serializedValue = serialized[name];

      if (serializedValue === undefined) {
        continue;
      }

      if (isPrimitive(serializedValue)) {
        if (descriptor && descriptor.unserializeFunc) {
          (this as any)[name] = descriptor.unserializeFunc(serializedValue);
        } else {
          (this as any)[name] = serializedValue;
        }
      } else if (node instanceof Serializable && !(serializedValue instanceof Array)) {
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

      if (descriptor && descriptor.tagNames && descriptor.tagNames.includes(tagName)) {
        // Is tagged using @SerializeOn decorator
        yield property;
      } else if (this.constructor.defaultTagNames.includes(tagName) && (!descriptor || !descriptor.tagNames)) {
        // Is tagged using @SerializeAllOn decorator and at the same time is not tagged with the @SerializeOn
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

      if (descriptor.tagNames && descriptor.tagNames.includes(tagName)) {
        yield { name, node, descriptor };
      }
    }
  }
}
