import { Action } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';

export class Investment extends Action {
  public money = new Effect(() => this.stats.finance.money, () => {
    const currentlyInvested = this.stats.finance.investment.value;
    return currentlyInvested.times(0.1);
  });
}
