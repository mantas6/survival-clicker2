import { Action } from '.';
import { ConditionFunction } from './action';
import Decimal from 'decimal.js';

export function Persist(ctor: typeof Action) {
  ctor.isPersistent = true;
}

export function NoFavorites(ctor: typeof Action) {
  ctor.canBeFavorited = false;
}

export function Unlocks<Node extends Action = Action>(actionClass: Node, propertyName: string) {
  const ctor = actionClass.constructor;

  ctor.unlockingMutations = [ ...ctor.unlockingMutations, propertyName ];
}

export function UnlocksWhen<Node extends Action = Action>(conditionFunc: ConditionFunction<Node>) {
  return (ctor: typeof Action) => {
    ctor.unlockingConditions = [ ...ctor.unlockingConditions, { conditionFunc } ];
  };
}

export function LocksWhen<Node extends Action = Action>(conditionFunc: ConditionFunction<Node>) {
  return (ctor: typeof Action) => {
    ctor.lockingConditions = [ ...ctor.lockingConditions, { conditionFunc } ];
  };
}

export function NoMultiplier(ctor: typeof Action) {
  ctor.defaultMaxMultiplier = new Decimal(1);
}
