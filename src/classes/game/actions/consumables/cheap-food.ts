import { Action } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';
import { SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit')
export class CheapFood extends Action {
  public stamina = new Effect(() => this.stats.character.energy, () => {
    return new Decimal(1);
  });

  public stomach = new Effect(() => this.stats.character.stomach, () => {
    return new Decimal(1);
  });

  public money = new Effect(() => this.stats.finance.money, () => {
    return new Decimal(-1);
  });
}
