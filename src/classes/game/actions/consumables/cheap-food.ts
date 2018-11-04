import { Action, Unlocks } from '@/classes/game/base/actions';
import { Duration } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
export class CheapFood extends Action {
  @Duration(() => 5)
  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(1);
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(5);
  });

  @Unlocks
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.modifiers.finance.costAdd.value.mul(1).ceil().negated();
  });
}
