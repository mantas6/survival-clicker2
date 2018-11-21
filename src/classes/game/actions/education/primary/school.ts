import { Action, Unlocks, VisibleWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@VisibleWhen(action => action.stats.education.school.value.lessThan(3))
export class School extends Action {
  @Unlocks
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.growthMoneyCost(this.stats.education.school.value, 50, 1.5);
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-15).div(this.modifiers.character.concentration.value);
  });

  school = new Mutation(() => this.stats.education.school, () => {
    return new Decimal(1);
  });
}
