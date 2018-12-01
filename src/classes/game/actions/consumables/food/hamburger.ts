import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { Effect } from '@/classes/game/base/modifiers';

@SerializeAllOn('emit')
@UnlocksWhen(action => action.modifiers.education.school.value.greaterThanOrEqualTo(2))
export class Hamburger extends Action {
  energy = new Effect({
    modifier: () => this.modifiers.character.intake.energy,
    duration: () => 20,
    value: () => new Decimal(0.3),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(6);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.moneyCost(8);
  });
}
