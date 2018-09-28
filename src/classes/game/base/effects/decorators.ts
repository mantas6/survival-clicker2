import { Effect, PropertyDescriptorMap } from './effect';
import Decimal from 'decimal.js';

export function Duration(durationFunc: () => Decimal) {
  return (effectClass: Effect, propertyName: string) => {
    const descriptors = prepareDescriptorsOfProperty(effectClass, propertyName);
    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.durationFunc = durationFunc;
    }
  };
}

export function Group(groupIndex: number) {
  return (effectClass: Effect, propertyName: string) => {
    const descriptors = prepareDescriptorsOfProperty(effectClass, propertyName);
    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.groupIndex = groupIndex;
    }
  };
}

function prepareDescriptorsOfProperty(effectClass: Effect, propertyName: string): PropertyDescriptorMap {
  const ctor = effectClass.constructor;
  // Copying the variable so that it doesn't mutate the prototype class
  const descriptors = new Map(ctor.descriptorsOfMutations);

  if (!descriptors.has(propertyName)) {
    descriptors.set(propertyName, {});
  }

  // Forwarding the copy to the class
  ctor.descriptorsOfMutations = descriptors;

  return descriptors;
}
