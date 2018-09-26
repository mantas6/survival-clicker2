import { Serializable, TagName, PropertyTagDescriptor } from './serializable';
import { prepareDescriptorsOfProperty } from '@/utils/descriptors';

function defaultDescriptorFunc(): PropertyTagDescriptor {
  return { tagNames: [] };
}

export function Tag(...tagNames: TagName[]) {
  return (serializableClass: Serializable, propertyName: string) => {
    const descriptors = prepareDescriptorsOfProperty(serializableClass, propertyName, defaultDescriptorFunc);

    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.tagNames.push(...tagNames);
    }
  };
}

export function SerializeAs<Target>(serializeFunc: (input: Target) => string | number) {
  return (serializableClass: Serializable, propertyName: string) => {
    const descriptors = prepareDescriptorsOfProperty(serializableClass, propertyName, defaultDescriptorFunc);

    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.serializeFunc = serializeFunc;
    }
  };
}

export function UnserializeAs<Target>(unserializeFunc: (input: number | string) => Target) {
  return (serializableClass: Serializable, propertyName: string) => {
    const descriptors = prepareDescriptorsOfProperty(serializableClass, propertyName, defaultDescriptorFunc);

    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.unserializeFunc = unserializeFunc;
    }
  };
}
