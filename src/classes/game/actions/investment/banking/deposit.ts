import { Action, Unlocks } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
export class Deposit extends Action {
  @Unlocks
  money = new Mutation(() => this.stats.finance.money, () => {
    const amount = this.timesCalculated.add(1).times(300);
    return this.helpers.moneyCost(amount);
  });

  investment = new Mutation(() => this.stats.finance.investment, () => {
    return new Decimal(10);
  });
}
