import { Action, LocksWhen, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@LocksWhen(action => !action.modifiers.education.medicine.value.isZero())
@UnlocksWhen(action => action.modifiers.education.school.value.greaterThanOrEqualTo(1))
export class MedicineLecture extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.moneyCost(50);
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-10).div(this.modifiers.character.concentration.value);
  });
}
