import { Action } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';
import { SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit')
export class Investment extends Action {
  money = new Effect(() => this.stats.finance.money, value => {
    return value.sub(this.modifiers.finance.costAdd.value.mul(10));
  });

  investment = new Effect(() => this.stats.finance.investment, value => {
    return value.add(1);
  });
}
