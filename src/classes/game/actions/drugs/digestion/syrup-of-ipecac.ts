import { IgnoreLimits } from '@/classes/game/base/processes';
import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit')
@UnlocksWhen(action => action.stats.education.medicine.value.greaterThanOrEqualTo(1))
export class SyrupOfIpecac extends Action {
  @IgnoreLimits('lessThanMinimum')
  health = new Mutation(() => this.stats.character.health, () => {
    return new Decimal(-10).div(this.modifiers.character.healthPreservationMultiplier.value);
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return this.stats.character.stomach.value.mul(0.5).negated();
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.moneyCost(1);
  });
}
