import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { Effect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.modifiers.education.medicine.knowsBasics())
@UnlocksWhen(action => action.modifiers.education.school.value.greaterThanOrEqualTo(3))
export class Morphine extends Action {
  staminaRestoreSpeed = new Effect({
    modifier: () => this.modifiers.character.staminaRestoreSpeed,
    duration: () => 60,
    value: () => new Decimal(-0.1),
  });

  energy = new Effect({
    modifier: () => this.modifiers.character.intake.energy,
    duration: () => 60,
    value: () => new Decimal(-0.2),
  });

  healthPreservationMultiplier = new Effect({
    modifier: () => this.modifiers.character.healthPreservationMultiplier,
    duration: () => 30,
    value: () => new Decimal(1),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(1);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.moneyCost(20);
  });
}
