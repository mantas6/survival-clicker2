import { Action, VisibleWhen, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@VisibleWhen(action => action.modifiers.education.bloodTest.value.isZero())
@UnlocksWhen(action => action.modifiers.education.school.value.greaterThanOrEqualTo(1))
export class BloodTest extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.moneyCost(50);
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-5).div(this.modifiers.character.concentration.value);
  });
}
