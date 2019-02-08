import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { ClothingAction } from '@/classes/game/base/actions/clothing-action';

export class WarmClothing extends ClothingAction {
  money = new Mutation(() => this.stats.finance.money, () => {
    if (this.timesCalculated.greaterThan(0)) {
      return new Decimal(0);
    }

    return this.helpers.moneyCost(10);
  });
}
