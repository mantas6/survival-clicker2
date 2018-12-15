import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { Effect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.modifiers.education.school.value.greaterThanOrEqualTo(3))
export class Coffee extends Action {
  energyLoss = new Effect({
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

  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.moneyCost(2);
  });
}
