import { Action } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';
import { SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit')
export class Investment extends Action {
  public money = new Effect(() => this.stats.finance.money, () => {
    return new Decimal(-1);
  });

  public investment = new Effect(() => this.stats.finance.investment, () => {
    return new Decimal(1);
  });
}
