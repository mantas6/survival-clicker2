import { Action } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

export class Underwear extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    if (this.timesCalculated.greaterThan(0)) {
      return new Decimal(0);
    }

    return this.helpers.moneyCost(5);
  });
}
