import { Action } from '.';

export function Unlocks(actionClass: Action, propertyName: string) {
  const ctor = actionClass.constructor;

  ctor.unlockingMutations = [ ...ctor.unlockingMutations, propertyName ];
}
