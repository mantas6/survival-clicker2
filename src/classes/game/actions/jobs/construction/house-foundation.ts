import { IgnoreLimits } from '@/classes/game/base/processes';
import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.modifiers.education.informationTechnology.value.greaterThanOrEqualTo(2))
export class HouseFoundation extends Action {
  @IgnoreLimits('lessThanMinimum')
  stamina = new Mutation(() => this.stats.character.stamina, () => {
    return new Decimal(-20);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(50).mul(this.modifiers.education.informationTechnology.value.minus(1));
  });
}
