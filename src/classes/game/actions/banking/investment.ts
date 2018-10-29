import { Action } from '@/classes/game/base/actions';
import { Effect } from '@/classes/game/base/effects';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
export class Investment extends Action {
  money = new Effect(() => this.stats.finance.money, () => {
    const base = this.stats.finance.investment.value.add(10);
    return this.modifiers.finance.costAdd.value.mul(base).negated();
  });

  investment = new Effect(() => this.stats.finance.investment, () => {
    return new Decimal(10);
  });
}
