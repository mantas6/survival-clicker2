import { Action } from '.';

export function Required(actionClass: Action, propertyName: string) {
  const ctor = actionClass.constructor;

  ctor.requiredEffects = [ ...ctor.requiredEffects, propertyName ];
}
