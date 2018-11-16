import { Action, Unlocks } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import { Effect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
export class CorticosteroidPills extends Action {
  energy = new Effect({
    modifier: () => this.modifiers.character.intake.hydration,
    duration: () => 60,
    value: () => new Decimal(-0.2),
  });

  healingSpeed = new Effect({
    modifier: () => this.modifiers.character.healingSpeed,
    duration: () => 15,
    value: () => new Decimal(0.5),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(1);
  });

  @Unlocks
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.modifiers.finance.costAdd.value.mul(15).ceil().negated();
  });
}
