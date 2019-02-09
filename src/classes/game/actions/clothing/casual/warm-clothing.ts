import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { ClothingAction } from '@/classes/game/base/actions/clothing-action';
import { Effect } from '@/classes/game/base/modifiers';

export class WarmClothing extends ClothingAction {
  money = new Mutation(() => this.stats.finance.money, () => {
    if (this.timesCalculated.greaterThan(0)) {
      return new Decimal(0);
    }

    return this.helpers.moneyCost(10);
  });

  insulation = new Effect({
    modifier: () => this.modifiers.character.thermoregulation.insulation,
    value: () => new Decimal(10),
  });
}
