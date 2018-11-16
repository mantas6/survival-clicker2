import { Action } from '.';
import { ConditionFunction } from './action';

export function Unlocks(actionClass: Action, propertyName: string) {
  const ctor = actionClass.constructor;

  ctor.unlockingMutations = [ ...ctor.unlockingMutations, propertyName ];
}

export function UnlocksWhen(conditionFunc: ConditionFunction) {
  return (ctor: typeof Action) => {
    ctor.unlockingConditions = [ ...ctor.unlockingConditions, { conditionFunc } ];
  };
}
