import { Action } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';
import { SerializeOn } from '@/classes/game/base/serialization';

export class Investment extends Action {
  @SerializeOn('emit')
  public money = new Effect(() => this.stats.finance.money, () => {
    return new Decimal(-1);
  });

  @SerializeOn('emit')
  public investment = new Effect(() => this.stats.finance.investment, () => {
    return new Decimal(1);
  });
}
