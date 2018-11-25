import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { Effect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.stats.education.medicine.knowsBasics())
export class DigestionPills extends Action {
  drainEnergy = new Effect({
    modifier: () => this.modifiers.character.intake.hydration,
    duration: () => 60,
    value: () => new Decimal(-0.1),
  });

  digestionSpeed = new Effect({
    modifier: () => this.modifiers.character.digestionSpeed,
    duration: () => 10,
    value: () => new Decimal(1),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(1);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.moneyCost(8);
  });
}
