import { Action, Unlocks } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { Effect } from '@/classes/game/base/modifiers';

@SerializeAllOn('emit')
export class CheapWater extends Action {
  hydration = new Effect({
    modifier: () => this.modifiers.character.intake.hydration,
    duration: () => 10,
    value: () => new Decimal(0.2),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(5);
  });

  @Unlocks
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.modifiers.finance.costAdd.value.mul(1).ceil().negated();
  });
}
