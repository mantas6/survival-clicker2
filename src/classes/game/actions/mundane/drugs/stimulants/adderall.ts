import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { TimerEffect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';
import { MoneyCostMutation } from '@/classes/game/base/templates/mutations/money-cost-mutation';

@UnlocksWhen(action => action.modifiers.education.medicine.knowsBasics())
@UnlocksWhen(action => action.modifiers.education.school.value.greaterThanOrEqualTo(4))
export class Adderall extends Action {
  energy = new TimerEffect({
    modifier: () => this.modifiers.character.intake.energy,
    duration: () => 30,
    value: () => new Decimal(-0.1),
  });

  restoreStamina = new TimerEffect({
    modifier: () => this.modifiers.character.staminaRestoreSpeed,
    duration: () => 5,
    value: () => new Decimal(5),
  });

  concentration = new TimerEffect({
    modifier: () => this.modifiers.character.concentration,
    duration: () => 10,
    value: () => new Decimal(0.1),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(1);
  });

  money = new MoneyCostMutation(() => this.stats.finance.money, () => {
    return new Decimal(10);
  });
}
