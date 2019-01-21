import { Action } from '.';
import Decimal from 'decimal.js';

export class StaminaAction extends Action {
  get hasWarning() {
    for (const { name, mutation, descriptor } of this.mutations()) {
      if (name === 'stamina' && descriptor && descriptor.ignoreLimits.includes('lessThanMinimum')) {
        if (!mutation.validate({ multiplier: new Decimal(1) })) {
          return true;
        }
      }
    }

    return false;
  }
}