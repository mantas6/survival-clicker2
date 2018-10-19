import { Serializable, TagName, PropertyDescriptor } from './serializable';

export function SerializeAllOn(...tagNames: TagName[]) {
  return (ctor: typeof Serializable) => {
    ctor.defaultTagNames = [ ...ctor.defaultTagNames, ...tagNames ];
  };
}

export function DonNotSerialize() {
  return (serializableClass: Serializable, propertyName: string) => {
    const descriptor = prepareDescriptorOfProperty(serializableClass, propertyName);

    descriptor.tagNames = [];
  };
}

export function SerializeOn(...tagNames: TagName[]) {
  return (serializableClass: Serializable, propertyName: string) => {
    const descriptor = prepareDescriptorOfProperty(serializableClass, propertyName);

    descriptor.tagNames.push(...tagNames);
  };
}

export function SerializeAs<Target>(serializeFunc: (input: Target) => string | number) {
  return (serializableClass: Serializable, propertyName: string) => {
    const descriptor = prepareDescriptorOfProperty(serializableClass, propertyName);

    descriptor.serializeFunc = serializeFunc;
  };
}

export function UnserializeAs<Target>(unserializeFunc: (input: number | string) => Target) {
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
