import { ProcessType, Process, EffectDescriptorMap } from './process';
import Decimal from 'decimal.js';
import { ProbeFlag } from '@/classes/game/base/stats';

export function Auto(ctor: typeof Process) {
  ctor.type = ProcessType.Auto;
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

export function IgnoreLimits(...flags: ProbeFlag[]) {
  return (processClass: Process, propertyName: string) => {
    const descriptors = prepareDescriptorsOfProperty(processClass, propertyName);
    const descriptor = descriptors.get(propertyName);

    if (descriptor) {
      descriptor.ignoreLimits.push(...flags);
    }
  };
}

function prepareDescriptorsOfProperty(processClass: Process, propertyName: string): EffectDescriptorMap {
  const ctor = processClass.constructor;
  // Copying the variable so that it doesn't mutate the prototype class
  const descriptors = new Map(ctor.descriptorsOfEffects);

  if (!descriptors.has(propertyName)) {
    descriptors.set(propertyName, {
      ignoreLimits: [],
    });
  }

  // Forwarding the copy to the class
  ctor.descriptorsOfEffects = descriptors;

  return descriptors;
}
