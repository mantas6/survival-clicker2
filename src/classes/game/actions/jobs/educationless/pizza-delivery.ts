import { IgnoreLimits } from '@/classes/game/base/processes';
import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.modifiers.education.driversLicense.value.greaterThan(0))
export class PizzaDelivery extends Action {
  @IgnoreLimits('lessThanMinimum')
  stamina = new Mutation(() => this.stats.character.stamina, () => {
    return new Decimal(-3);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(15);
  });
}
