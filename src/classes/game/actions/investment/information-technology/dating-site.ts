import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
@UnlocksWhen(action => action.modifiers.education.informationTechnology.value.greaterThanOrEqualTo(5))
export class DatingSite extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.growthMoneyCost(this.timesCalculated, 2000, 1.15);
  });

  investment = new Mutation(() => this.stats.finance.investment, () => {
    return new Decimal(16);
  });
}
