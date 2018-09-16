import { Serializable, TagName } from './serializable';

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
