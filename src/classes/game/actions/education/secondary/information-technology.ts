import { Action, LocksWhen, UnlocksWhen, NoMultiplier } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.modifiers.education.school.hasFinished)
@LocksWhen(action => action.modifiers.education.informationTechnology.hasFinished)
@NoMultiplier
export class InformationTechnology extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.growthMoneyCost(this.modifiers.education.informationTechnology.value, 150, 2);
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-20).div(this.modifiers.character.concentration.value);
  });
}
