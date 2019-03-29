import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { TimerEffect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';
import { MoneyCostMutation } from '@/classes/game/base/templates/mutations/money-cost-mutation';

@UnlocksWhen(action => action.modifiers.education.medicine.knowsBasics())
@UnlocksWhen(action => action.modifiers.education.school.value.greaterThanOrEqualTo(5))
export class Morphine extends Action {
  staminaRestoreSpeed = new TimerEffect({
    modifier: () => this.modifiers.character.regeneration.stamina.restoreSpeedBoost,
    duration: () => 60,
    value: () => new Decimal(-0.1),
  });

  energy = new TimerEffect({
    modifier: () => this.modifiers.character.intake.energy,
    duration: () => 60,
    value: () => new Decimal(-0.2),
  });

  healthPreservationMultiplier = new TimerEffect({
    modifier: () => this.modifiers.character.healthPreservationMultiplier,
    duration: () => 30,
    value: () => new Decimal(1),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(1);
  });

  money = new MoneyCostMutation(() => this.stats.finance.money, () => {
    return new Decimal(20);
  });
}
