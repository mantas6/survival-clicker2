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
      if (node) {
        if (descriptor.serializationFunc) {
          serialized[name] = descriptor.serializationFunc(node);
          //
        } else {
          serialized[name] = node.serialize(tagName);
        }
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

export function Filter<Target>(serializationFunc: (input: Target) => string | number) {
  return (serializableClass: Serializable, propertyName: string) => {
    initializeDescriptorsOfProperties(serializableClass, propertyName);

    const descriptors = serializableClass.constructor.descriptorsOfProperties;
    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.serializationFunc = serializationFunc;
    }
  };
}

function initializeDescriptorsOfProperties(serializableClass: Serializable, propertyName: string) {
    const ctor = serializableClass.constructor;
    // Copying the variable so that it doesn't mutate the prototype class
    const descriptors = new Map(ctor.descriptorsOfProperties);

    if (!descriptors.has(propertyName)) {
      descriptors.set(propertyName, { tagNames: [] });
      // Forwarding the copy to the class
      ctor.descriptorsOfProperties = descriptors;
    }
}
