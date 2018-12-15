import { Serializable, TagName, PropertyDescriptor, BasicValue, ArrayValue } from './serializable';

/**
 * Serializes all children of the class
 * @param tagNames tag names of serialization
 */
export function SerializeAllOn(...tagNames: TagName[]) {
  return (ctor: typeof Serializable) => {
    ctor.defaultTagNames = [ ...ctor.defaultTagNames, ...tagNames ];
  };
}

/**
 * Will skip an individual child of the class. Used in conjunction with SerializeAllOn
 */
export function DoNotSerialize() {
  return (serializableClass: Serializable, propertyName: string) => {
    const descriptor = prepareDescriptorOfProperty(serializableClass, propertyName);

    descriptor.tagNames = [];
  };
}

/**
 * Marks child as serializable on a given serialization type (tag)
 * @param tagNames tag names of serialization
 */
export function SerializeOn(...tagNames: TagName[]) {
  return (serializableClass: Serializable, propertyName: string) => {
    const descriptor = prepareDescriptorOfProperty(serializableClass, propertyName);

    descriptor.tagNames.push(...tagNames);
  };
}

/**
 * Overrides the default way of serialization. Used for objects that do not extend Serializable
 * @param serializeFunc serialization handler to use
 */
export function SerializeAs<Target>(serializeFunc: (input: Target) => BasicValue | ArrayValue) {
  return (serializableClass: Serializable, propertyName: string) => {
    const descriptor = prepareDescriptorOfProperty(serializableClass, propertyName);

    descriptor.serializeFunc = serializeFunc;
  };
}

/**
 * Overrides the default way of unserialization. Used for objects that do not extend Serializable
 * @param serializeFunc unserialization handler to use
 */
export function UnserializeAs<Target>(unserializeFunc: (input: string | number | boolean) => Target) {
  return (serializableClass: Serializable, propertyName: string) => {
    const descriptor = prepareDescriptorOfProperty(serializableClass, propertyName);

    descriptor.unserializeFunc = unserializeFunc;
  };
}

function prepareDescriptorOfProperty(serializableClass: Serializable, propertyName: string): PropertyDescriptor {
  const ctor = serializableClass.constructor;
  // Copying the variable so that it doesn't mutate the prototype class
  const descriptors = new Map(ctor.descriptorsOfProperties);

  if (!descriptors.has(propertyName)) {
    descriptors.set(propertyName, { tagNames: [] });
  }

  // Forwarding the copy to the class
  ctor.descriptorsOfProperties = descriptors;

  return descriptors.get(propertyName)!;
}
