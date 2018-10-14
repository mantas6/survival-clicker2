import { Action } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';
import { SerializeOn } from '@/classes/game/base/serialization';

export class CheapWater extends Action {
  @SerializeOn('emit')
  public hydration = new Effect(() => this.stats.character.hydration, () => {
    return new Decimal(1);
  });

  @SerializeOn('emit')
  public stomach = new Effect(() => this.stats.character.stomach, () => {
    return new Decimal(1);
  });

  @SerializeOn('emit')
  public money = new Effect(() => this.stats.finance.money, () => {
    return new Decimal(-1);
  });
}
