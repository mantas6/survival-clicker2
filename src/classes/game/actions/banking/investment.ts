import { Action } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
export class Investment extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    const base = this.stats.finance.investment.value.add(10);
    return this.modifiers.finance.costAdd.value.mul(base).ceil().negated();
  });

  investment = new Mutation(() => this.stats.finance.investment, () => {
    return new Decimal(10);
  });
}
