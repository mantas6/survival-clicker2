import { Action, LocksWhen, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { MoneyCostMutation } from '@/classes/game/base/templates/mutations/money-cost-mutation';

@LocksWhen(action => !action.modifiers.education.driversLicense.value.isZero())
@UnlocksWhen(action => action.modifiers.education.school.value.greaterThanOrEqualTo(3))
export class DriversLicense extends Action {
  money = new MoneyCostMutation(() => this.stats.finance.money, () => {
    return new Decimal(200);
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-10).div(this.modifiers.character.concentration.value);
  });
}
