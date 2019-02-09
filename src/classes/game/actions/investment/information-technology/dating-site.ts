import { Action, UnlocksWhen, NoMultiplier } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { growth } from '@/utils/math';
import { MoneyCostMutation } from '@/classes/game/base/templates/mutations/money-cost-mutation';

@SerializeAllOn('emit')
@UnlocksWhen(action => action.modifiers.education.informationTechnology.value.greaterThanOrEqualTo(5))
@NoMultiplier
export class DatingSite extends Action {
  money = new MoneyCostMutation(() => this.stats.finance.money, () => {
    return new Decimal(growth(this.timesCalculated, 2000, 1.15));
  });

  investment = new Mutation(() => this.stats.finance.investment, () => {
    return new Decimal(16);
  });
}
