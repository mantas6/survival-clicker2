import { StateNode } from '@/classes/game/base/state-node';

interface SerializedNode {
  [ propertyName: string ]: SerializedNode | string | number;
}

interface PropertyTagDescriptor {
  tagNames: string[];
  serializationFunc?: (input: any) => string | number;
}

interface PropertyTagUnion {
  propertyName: string;
  tagName: string;
  serializationFunc?: (input: any) => string | number;
}

type TagName = 'emit' | 'store';
type PropertyTagIterator = IterableIterator<{ name: string, node: Serializable, descriptor: PropertyTagDescriptor }>;

export abstract class Serializable extends StateNode {
  public static descriptorsOfProperties = new Map<string, PropertyTagDescriptor>();
  public 'constructor': typeof Serializable;
  [ propertyName: string ]: any;

  public serialize(tagName: TagName) {
    const serialized: SerializedNode = {};

    for (const { name, node, descriptor } of this.propertiesWithTag(tagName)) {
      if (descriptor.serializationFunc) {
        serialized[name] = descriptor.serializationFunc(node);
        //
      } else if (node) {
        serialized[name] = node.serialize(tagName);
      }
    }

    return serialized;
  }

  protected *propertiesWithTag(tagName: TagName): PropertyTagIterator {
    for (const [ name, descriptor ] of this.constructor.descriptorsOfProperties) {
      if (descriptor.tagNames.includes(tagName)) {
        const node = this[name];
        yield { name, node, descriptor };
      }
    }
  }
}

export function Tag(tagName: TagName) {
  return (serializableClass: Serializable, propertyName: string) => {
    initializeDescriptorsOfProperties(serializableClass, propertyName);

    const descriptors = serializableClass.constructor.descriptorsOfProperties;
    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.tagNames.push(tagName);
    }
  };
}

export function TagValue<Target>(tagName: TagName, serializationFunc: (input: Target) => string | number) {
  return (serializableClass: Serializable, propertyName: string) => {
    initializeDescriptorsOfProperties(serializableClass, propertyName);

    const descriptors = serializableClass.constructor.descriptorsOfProperties;
    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.tagNames.push(tagName);
      descriptor.serializationFunc = serializationFunc;
    }
  };
}

function initializeDescriptorsOfProperties(serializableClass: Serializable, propertyName: string) {
    const ctor = serializableClass.constructor;
    const descriptors = ctor.descriptorsOfProperties;

    if (!descriptors.has(propertyName)) {
      descriptors.set(propertyName, { tagNames: [] });
    }
}