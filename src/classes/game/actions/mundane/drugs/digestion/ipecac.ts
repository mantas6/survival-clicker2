import { IgnoreLimits } from '@/classes/game/base/processes';
import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { MoneyCostMutation } from '@/classes/game/base/templates/mutations/money-cost-mutation';

@UnlocksWhen(action => action.modifiers.education.school.value.greaterThanOrEqualTo(3))
export class Ipecac extends Action {
  @IgnoreLimits('lessThanMinimum')
  health = new Mutation(() => this.stats.character.health, () => {
    return new Decimal(-5).div(this.modifiers.character.healthPreservationMultiplier.value);
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return this.stats.character.stomach.value.mul(0.5).negated();
  });

  money = new MoneyCostMutation(() => this.stats.finance.money, () => {
    return new Decimal(1);
  });
}
