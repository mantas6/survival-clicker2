import { Action } from '@/classes/game/base/actions';
import { Effect } from '@/classes/game/base/effects';

export class Investment extends Action {
  money = new Effect(() => this.stats.finance.money, () => {
    return this.modifiers.finance.moneyGain.value;
  });
}
