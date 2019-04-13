import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { TimerEffect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';
import { MoneyCostMutation } from '@/classes/game/base/templates/mutations/money-cost-mutation';

@UnlocksWhen(action => action.modifiers.education.school.hasStarted)
export class EnergyDrink extends Action {
  hydration = new TimerEffect({
    modifier: () => this.modifiers.character.intake.hydration,
    duration: () => 30,
    value: () => new Decimal(-0.1),
  });

  stamina = new TimerEffect({
    modifier: () => this.modifiers.character.regeneration.stamina.restoreSpeedBoost,
    duration: () => 5,
    value: () => new Decimal(3),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(2);
  });

  money = new MoneyCostMutation(() => this.stats.finance.money, () => {
    return new Decimal(2);
  });
}
