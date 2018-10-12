import { Process } from '@/classes/game/base/processes/process';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';
import { SerializeOn } from '@/classes/game/base/serialization';

export class CheapFood extends Process {
  @SerializeOn('emit')
  public stamina = new Effect(() => this.stats.character.energy, () => {
    return new Decimal(1);
  });

  @SerializeOn('emit')
  public money = new Effect(() => this.stats.finance.money, () => {
    return new Decimal(-1);
  });
}
