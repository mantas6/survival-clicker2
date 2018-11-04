import { Process, MutationDescriptor, ConditionFunction } from './process';
import Decimal from 'decimal.js';
import { LimitFlag } from '@/classes/game/base/stats';

export function When(conditionFunc: ConditionFunction) {
  return (ctor: typeof Process) => {
    ctor.conditions = [ ...ctor.conditions, { conditionFunc } ];
  };
}

export function Duration(durationFunc: () => Decimal | number | string) {
  return (processClass: Process, propertyName: string) => {
    const descriptor = prepareDescriptorOfProperty(processClass, propertyName);

    descriptor.durationFunc = () => {
      const duration = durationFunc();

      return new Decimal(duration);
    };
  };
}

export function IgnoreLimits(...flags: LimitFlag[]) {
  return (processClass: Process, propertyName: string) => {
    const descriptor = prepareDescriptorOfProperty(processClass, propertyName);

    descriptor.ignoreLimits.push(...flags);
  };
}

function prepareDescriptorOfProperty(processClass: Process, propertyName: string): MutationDescriptor {
  const ctor = processClass.constructor;
  // Copying the variable so that it doesn't mutate the prototype class
  const descriptors = new Map(ctor.descriptorsOfMutations);

  if (!descriptors.has(propertyName)) {
    descriptors.set(propertyName, {
      ignoreLimits: [],
    });
  }

  // Forwarding the copy to the class
  ctor.descriptorsOfMutations = descriptors;

  return descriptors.get(propertyName)!;
}
