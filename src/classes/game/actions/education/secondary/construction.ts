import { Action, VisibleWhen, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.stats.education.school.value.greaterThanOrEqualTo(3))
@VisibleWhen(action => action.stats.education.construction.value.lessThan(5))
export class Construction extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.growthMoneyCost(this.stats.education.construction.value, 100, 1.5);
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-20).div(this.modifiers.character.concentration.value);
  });

  construction = new Mutation(() => this.stats.education.construction, () => {
    return new Decimal(1);
  });
}
