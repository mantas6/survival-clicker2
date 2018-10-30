import { Action } from '.';

export function Unlocks(actionClass: Action, propertyName: string) {
  const ctor = actionClass.constructor;

  ctor.unlockingEffects = [ ...ctor.unlockingEffects, propertyName ];
}
