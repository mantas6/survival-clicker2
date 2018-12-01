import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { Effect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.modifiers.education.medicine.knowsBasics())
@UnlocksWhen(action => action.modifiers.education.informationTechnology.value.greaterThanOrEqualTo(1))
export class Modafinil extends Action {
  drainEnergy = new Effect({
    modifier: () => this.modifiers.character.concentration,
    duration: () => 10,
    value: () => new Decimal(0.1),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(1);
  });

  hydration = new Effect({
    modifier: () => this.modifiers.character.intake.hydration,
    duration: () => 60,
    value: () => new Decimal(-0.1),
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.moneyCost(10);
  });
}
