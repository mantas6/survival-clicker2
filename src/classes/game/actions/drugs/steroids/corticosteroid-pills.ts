import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { Effect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.stats.education.medicine.value.greaterThanOrEqualTo(3))
export class CorticosteroidPills extends Action {
  energy = new Effect({
    modifier: () => this.modifiers.character.intake.hydration,
    duration: () => 60,
    value: () => new Decimal(-0.2),
  });

  healingSpeed = new Effect({
    modifier: () => this.modifiers.character.healingSpeed,
    duration: () => 15,
    value: () => new Decimal(0.5),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(1);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.moneyCost(15);
  });
}
