import { Action, LocksWhen, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.modifiers.education.school.value.greaterThanOrEqualTo(3))
@LocksWhen(action => action.modifiers.education.informationTechnology.value.greaterThanOrEqualTo(5))
export class InformationTechnology extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.growthMoneyCost(this.modifiers.education.informationTechnology.value, 150, 2);
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-20).div(this.modifiers.character.concentration.value);
  });
}
