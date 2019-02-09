import { Action, Unlocks, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { TimerEffect } from '@/classes/game/base/modifiers';
import { MoneyCostMutation } from '@/classes/game/base/templates/mutations/money-cost-mutation';

@SerializeAllOn('emit')
@UnlocksWhen(action => action.modifiers.education.school.hasFinished)
export class MineralWater extends Action {
  hydration = new TimerEffect({
    modifier: () => this.modifiers.character.intake.hydration,
    duration: () => 10,
    value: () => new Decimal(0.8),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(5);
  });

  @Unlocks
  money = new MoneyCostMutation(() => this.stats.finance.money, () => {
    return new Decimal(6);
  });
}
