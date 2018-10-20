import { Action } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';

export class Investment extends Action {
  money = new Effect(() => this.stats.finance.money, value => {
    return value.add(this.modifiers.finance.moneyGain.value);
  });
}
