import { Serializable, SerializeOnName, PropertySerializeOnDescriptorMap } from './serializable';

export function SerializeAllOn(...SerializeOnNames: SerializeOnName[]) {
  return (serializableClass: Serializable) => {
    const ctor = serializableClass.constructor;
    ctor.defaultSerializeOnNames = [ ...ctor.defaultSerializeOnNames, ...SerializeOnNames ];
  };
}

export function SerializeOn(...SerializeOnNames: SerializeOnName[]) {
  return (serializableClass: Serializable, propertyName: string) => {
    const descriptors = prepareDescriptorsOfProperty(serializableClass, propertyName);

    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.SerializeOnNames.push(...SerializeOnNames);
    }
  };
}

export function SerializeAs<Target>(serializeFunc: (input: Target) => string | number) {
  return (serializableClass: Serializable, propertyName: string) => {
    const descriptors = prepareDescriptorsOfProperty(serializableClass, propertyName);

    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.serializeFunc = serializeFunc;
    }
  };
}

export function UnserializeAs<Target>(unserializeFunc: (input: number | string) => Target) {
  return (serializableClass: Serializable, propertyName: string) => {
    const descriptors = prepareDescriptorsOfProperty(serializableClass, propertyName);

    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.unserializeFunc = unserializeFunc;
    }
  };
}

function prepareDescriptorsOfProperty(serializableClass: Serializable, propertyName: string): PropertySerializeOnDescriptorMap {
  const ctor = serializableClass.constructor;
  // Copying the variable so that it doesn't mutate the prototype class
  const descriptors = new Map(ctor.descriptorsOfProperties);

  if (!descriptors.has(propertyName)) {
    descriptors.set(propertyName, { SerializeOnNames: [] });
  }

  // Forwarding the copy to the class
  ctor.descriptorsOfProperties = descriptors;

  return descriptors;
}
