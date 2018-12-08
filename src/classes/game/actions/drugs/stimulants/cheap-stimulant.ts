import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { Effect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.modifiers.education.medicine.knowsBasics())
@UnlocksWhen(action => action.modifiers.education.school.value.greaterThanOrEqualTo(3))
export class CheapStimulant extends Action {
  energy = new Effect({
    modifier: () => this.modifiers.character.intake.energy,
    duration: () => 30,
    value: () => new Decimal(-0.1),
  });

  restoreStamina = new Effect({
    modifier: () => this.modifiers.character.staminaRestoreSpeed,
    duration: () => 5,
    value: () => new Decimal(5),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(1);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.moneyCost(10);
  });
}
