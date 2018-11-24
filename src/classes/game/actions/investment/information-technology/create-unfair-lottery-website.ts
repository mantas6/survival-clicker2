import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
@UnlocksWhen(action => action.stats.education.informationTechnology.value.greaterThanOrEqualTo(2))
export class CreateUnfairLotteryWebsite extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.growthMoneyCost(1, 1000, 5);
  });

  investment = new Mutation(() => this.stats.finance.investment, () => {
    return new Decimal(10);
  });
}
