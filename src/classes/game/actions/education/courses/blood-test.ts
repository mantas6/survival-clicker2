import { Action, LocksWhen, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { MoneyCostMutation } from '@/classes/game/base/templates/mutations/money-cost-mutation';

@LocksWhen(action => !action.modifiers.education.bloodTest.value.isZero())
@UnlocksWhen(action => action.modifiers.education.school.value.greaterThanOrEqualTo(2))
export class BloodTest extends Action {
  money = new MoneyCostMutation(() => this.stats.finance.money, () => {
    return new Decimal(50);
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-5).div(this.modifiers.character.concentration.value);
  });
}
