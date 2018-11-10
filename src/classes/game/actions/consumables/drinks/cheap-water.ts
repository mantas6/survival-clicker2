import { Action, Unlocks } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { Effect } from '@/classes/game/base/modifiers';
import { Duration } from '@/classes/game/base/processes';

@SerializeAllOn('emit')
export class CheapWater extends Action {
  @Duration(() => 10)
  hydration = new Effect(() => this.modifiers.character.intake.hydration, () => {
    return new Decimal(0.2);
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(5);
  });

  @Unlocks
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.modifiers.finance.costAdd.value.mul(1).ceil().negated();
  });
}
