import { Process, EffectDescriptor } from './process';
import Decimal from 'decimal.js';
import { LimitFlag } from '@/classes/game/base/stats';

export function Duration(duration: Decimal) {
  return (processClass: Process, propertyName: string) => {
    const descriptor = prepareDescriptorOfProperty(processClass, propertyName);

    descriptor.duration = duration;
  };
}

export function IgnoreLimits(...flags: LimitFlag[]) {
  return (processClass: Process, propertyName: string) => {
    const descriptor = prepareDescriptorOfProperty(processClass, propertyName);

    descriptor.ignoreLimits.push(...flags);
  };
}

function prepareDescriptorOfProperty(processClass: Process, propertyName: string): EffectDescriptor {
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

  return descriptors.get(propertyName)!;
}
