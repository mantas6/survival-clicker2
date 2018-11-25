import { Action, VisibleWhen, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@VisibleWhen(action => action.stats.education.medicine.value.isZero())
@UnlocksWhen(action => action.stats.education.school.value.greaterThanOrEqualTo(1))
export class MedicineLecture extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.moneyCost(50);
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-10).div(this.modifiers.character.concentration.value);
  });

  medicine = new Mutation(() => this.stats.education.medicine, () => {
    return new Decimal(0.5);
  });
}
