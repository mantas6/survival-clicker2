import { Process, MutationDescriptor, ConditionFunction, ProcessableDescriptorType, EffectDescriptor } from './process';
import { LimitFlag } from '@/classes/game/base/stats';

export function When(conditionFunc: ConditionFunction) {
  return (ctor: typeof Process) => {
    ctor.conditions = [ ...ctor.conditions, { conditionFunc } ];
  };
}

export function IgnoreLimits(...flags: LimitFlag[]) {
  return (processClass: Process, propertyName: string) => {
    const descriptor = prepareDescriptorOfProperty('mutation', processClass, propertyName) as MutationDescriptor;

    descriptor.ignoreLimits.push(...flags);
  };
}

function prepareDescriptorOfProperty(
  type: ProcessableDescriptorType,
  processClass: Process,
  propertyName: string): MutationDescriptor | EffectDescriptor {
  const ctor = processClass.constructor;
  // Copying the variable so that it doesn't mutate the prototype class
  const descriptors = new Map(ctor.descriptorsOfProcessables);

  if (!descriptors.has(propertyName)) {
    if (type === 'mutation') {
      descriptors.set(propertyName, {
        type: 'mutation' ,
        ignoreLimits: [],
      });
    } else {
      descriptors.set(propertyName, {
        type: 'effect' ,
      });
    }
  }

  // Forwarding the copy to the class
  ctor.descriptorsOfProcessables = descriptors;

  return descriptors.get(propertyName)!;
}
