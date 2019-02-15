import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { TimerEffect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';
import { MoneyCostMutation } from '@/classes/game/base/templates/mutations/money-cost-mutation';

@UnlocksWhen(action => action.modifiers.education.medicine.knowsBasics())
@UnlocksWhen(action => action.modifiers.education.bloodTest.value.greaterThan(0))
export class CorticosteroidPills extends Action {
  hydration = new TimerEffect({
    modifier: () => this.modifiers.character.intake.hydration,
    duration: () => 60,
    value: () => new Decimal(-0.2),
  });

  healingSpeed = new TimerEffect({
    modifier: () => this.modifiers.character.healingSpeed,
    duration: () => 15,
    value: () => new Decimal(0.5),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(1);
  });

  money = new MoneyCostMutation(() => this.stats.finance.money, () => {
    return new Decimal(15);
  });
}
