import { Action, Unlocks, LocksWhen, NoMultiplier } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@LocksWhen(action => action.modifiers.education.school.hasFinished)
@NoMultiplier
export class School extends Action {
  @Unlocks
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.growthMoneyCost(this.modifiers.education.school.value, 50, 1.5);
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-15).div(this.modifiers.character.concentration.value);
  });

}
