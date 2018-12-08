import { Action, Unlocks } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
export class Deposit extends Action {
  @Unlocks
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.growthMoneyCost(this.timesCalculated, 200, 1.1);
  });

  investment = new Mutation(() => this.stats.finance.investment, () => {
    return new Decimal(1);
  });
}
