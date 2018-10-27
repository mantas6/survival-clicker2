import { Action } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import { SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit')
export class Investment extends Action {
  money = new Effect(() => this.stats.finance.money, value => {
    const base = this.stats.finance.investment.value.add(10);
    return value.sub(this.modifiers.finance.costAdd.value.mul(base));
  });

  investment = new Effect(() => this.stats.finance.investment, value => {
    return value.add(10);
  });
}
