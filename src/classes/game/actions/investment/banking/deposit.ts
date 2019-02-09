import { Action, Unlocks, NoMultiplier } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { MoneyCostMutation } from '@/classes/game/base/templates/mutations/money-cost-mutation';
import { growth } from '@/utils/math';

@SerializeAllOn('emit')
@NoMultiplier
export class Deposit extends Action {
  @Unlocks
  money = new MoneyCostMutation(() => this.stats.finance.money, () => {
    return new Decimal(growth(this.timesCalculated, 200, 1.3));
  });

  investment = new Mutation(() => this.stats.finance.investment, () => {
    return new Decimal(1);
  });
}
