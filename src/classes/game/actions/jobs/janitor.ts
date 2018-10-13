import { Action } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';
import { SerializeOn } from '@/classes/game/base/serialization';

export class Janitor extends Action {
  @SerializeOn('emit')
  public stamina = new Effect(() => this.stats.character.stamina, () => {
    return new Decimal(-5);
  });

  @SerializeOn('emit')
  public money = new Effect(() => this.stats.finance.money, () => {
    return new Decimal(1);
  });
}
