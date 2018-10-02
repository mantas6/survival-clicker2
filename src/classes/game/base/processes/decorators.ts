import { ProcessType, Process, EffectDescriptorMap } from './process';
import Decimal from 'decimal.js';

export function Auto(processClass: Process) {
  processClass.constructor.type = ProcessType.Auto;
}

export function Duration(duration: Decimal) {
  return (processClass: Process, propertyName: string) => {
    const descriptors = prepareDescriptorsOfProperty(processClass, propertyName);
    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.duration = duration;
    }
  };
}

function prepareDescriptorsOfProperty(processClass: Process, propertyName: string): EffectDescriptorMap {
  const ctor = processClass.constructor;
  // Copying the variable so that it doesn't mutate the prototype class
  const descriptors = new Map(ctor.descriptorsOfEffects);

  if (!descriptors.has(propertyName)) {
    descriptors.set(propertyName, {});
  }

  // Forwarding the copy to the class
  ctor.descriptorsOfEffects = descriptors;

  return descriptors;
}
