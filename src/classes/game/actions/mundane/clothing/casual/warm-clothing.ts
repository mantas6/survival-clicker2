import Decimal from 'decimal.js';
import { ClothingAction } from '@/classes/game/base/actions/clothing-action';
import { Effect } from '@/classes/game/base/modifiers';
import { Unlocks } from '@/classes/game/base/actions';
import { MoneyCostMutation } from '@/classes/game/base/templates/mutations/money-cost-mutation';

export class WarmClothing extends ClothingAction {
  @Unlocks
  money = new MoneyCostMutation(() => this.stats.finance.money, () => {
    if (this.timesCalculated.greaterThan(0)) {
      return new Decimal(0);
    }

    return new Decimal(10);
  });

  insulation = new Effect({
    modifier: () => this.modifiers.character.thermoregulation.insulation,
    value: () => new Decimal(10),
  });
}
