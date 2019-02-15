import { Action, LocksWhen, UnlocksWhen, NoMultiplier } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { MoneyCostMutation } from '@/classes/game/base/templates/mutations/money-cost-mutation';
import { growth } from '@/utils/math';

@UnlocksWhen(action => action.modifiers.education.school.hasFinished)
@LocksWhen(action => action.modifiers.education.construction.hasFinished)
@NoMultiplier
export class Construction extends Action {
  money = new MoneyCostMutation(() => this.stats.finance.money, () => {
    return new Decimal(growth(this.modifiers.education.construction.value, 100, 1.5));
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-20).div(this.modifiers.character.concentration.value);
  });
}
