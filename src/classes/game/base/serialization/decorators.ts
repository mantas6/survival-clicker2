import { Serializable, TagName } from './serializable';

export function Tag(...tagNames: TagName[]) {
  return (serializableClass: Serializable, propertyName: string) => {
    initializeDescriptorsOfProperty(serializableClass, propertyName);

    const descriptors = serializableClass.constructor.descriptorsOfProperties;
    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.tagNames.push(...tagNames);
    }
  };
}

export function Filter<Target>(serializationFunc: (input: Target) => string | number) {
  return (serializableClass: Serializable, propertyName: string) => {
    initializeDescriptorsOfProperty(serializableClass, propertyName);

    const descriptors = serializableClass.constructor.descriptorsOfProperties;
    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.serializationFunc = serializationFunc;
    }
  };
}

function initializeDescriptorsOfProperty(serializableClass: Serializable, propertyName: string) {
    const ctor = serializableClass.constructor;
    // Copying the variable so that it doesn't mutate the prototype class
    const descriptors = new Map(ctor.descriptorsOfProperties);

    if (!descriptors.has(propertyName)) {
      descriptors.set(propertyName, { tagNames: [] });
      // Forwarding the copy to the class
      ctor.descriptorsOfProperties = descriptors;
    }
}
