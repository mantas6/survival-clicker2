import { Action } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';
import { SerializeOn } from '@/classes/game/base/serialization';

export class Investment extends Action {
  @SerializeOn('emit')
  public money = new Effect(() => this.stats.finance.money, () => {
    const currentlyInvested = this.stats.finance.investment.value;
    return currentlyInvested.times(0.1);
  });
}
