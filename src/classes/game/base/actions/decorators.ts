import { Action } from '.';
import { ConditionFunction } from './action';
import Decimal from 'decimal.js';

export function Unlocks(actionClass: Action, propertyName: string) {
  const ctor = actionClass.constructor;

  ctor.unlockingMutations = [ ...ctor.unlockingMutations, propertyName ];
}

export function UnlocksWhen(conditionFunc: ConditionFunction) {
  return (ctor: typeof Action) => {
    ctor.unlockingConditions = [ ...ctor.unlockingConditions, { conditionFunc } ];
  };
}

export function LocksWhen(conditionFunc: ConditionFunction) {
  return (ctor: typeof Action) => {
    ctor.lockingConditions = [ ...ctor.lockingConditions, { conditionFunc } ];
  };
}

export function NoMultiplier(ctor: typeof Action) {
  ctor.defaultMaxMultiplier = new Decimal(1);
}
