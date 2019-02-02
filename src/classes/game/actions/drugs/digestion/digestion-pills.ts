import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { TimerEffect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.modifiers.education.medicine.knowsBasics())
export class DigestionPills extends Action {
  hydration = new TimerEffect({
    modifier: () => this.modifiers.character.intake.hydration,
    duration: () => 30,
    value: () => new Decimal(-0.1),
  });

  digestionSpeed = new TimerEffect({
    modifier: () => this.modifiers.character.digestionSpeed,
    duration: () => 10,
    value: () => new Decimal(3),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(1);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.moneyCost(8);
  });
}
