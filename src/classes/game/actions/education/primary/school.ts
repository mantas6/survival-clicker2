import { Action, Unlocks, LocksWhen, NoMultiplier } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { MoneyCostMutation } from '@/classes/game/base/templates/mutations/money-cost-mutation';
import { growth } from '@/utils/math';

@LocksWhen(action => action.modifiers.education.school.hasFinished)
@NoMultiplier
export class School extends Action {
  @Unlocks
  money = new MoneyCostMutation(() => this.stats.finance.money, () => {
    return new Decimal(growth(this.modifiers.education.school.value, 50, 1.5));
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-15).div(this.modifiers.character.concentration.value);
  });

}
