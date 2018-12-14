import { Action, Unlocks, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { Effect } from '@/classes/game/base/modifiers';

@SerializeAllOn('emit')
@UnlocksWhen(action => action.modifiers.education.school.value.greaterThanOrEqualTo(3))
export class MineralWater extends Action {
  hydration = new Effect({
    modifier: () => this.modifiers.character.intake.hydration,
    duration: () => 10,
    value: () => new Decimal(0.8),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(5);
  });

  @Unlocks
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.moneyCost(6);
  });
}
