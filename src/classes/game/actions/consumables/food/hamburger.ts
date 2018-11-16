import { Action, Unlocks } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { Effect } from '@/classes/game/base/modifiers';

@SerializeAllOn('emit')
export class Hamburger extends Action {
  energy = new Effect({
    modifier: () => this.modifiers.character.intake.energy,
    duration: () => 20,
    value: () => new Decimal(0.3),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(6);
  });

  @Unlocks
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.modifiers.finance.costAdd.value.mul(8).ceil().negated();
  });
}