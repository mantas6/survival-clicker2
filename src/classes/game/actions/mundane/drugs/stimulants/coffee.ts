import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { TimerEffect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';
import { MoneyCostMutation } from '@/classes/game/base/templates/mutations/money-cost-mutation';

@UnlocksWhen(action => action.modifiers.education.school.value.greaterThanOrEqualTo(3))
export class Coffee extends Action {
  energyLoss = new TimerEffect({
    modifier: () => this.modifiers.character.intake.energy,
    duration: () => 50,
    value: () => new Decimal(-0.1),
  });

  energyRush = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(5);
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(3);
  });

  money = new MoneyCostMutation(() => this.stats.finance.money, () => {
    return new Decimal(2);
  });
}
