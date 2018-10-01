import { Process } from '@/classes/game/base/processes/process';
import { Effect } from '@/classes/game/base/processes/effect';
import Decimal from 'decimal.js';
import { SerializeOn } from '@/classes/game/base/serialization';

export class StaminaRestore extends Process {
  @SerializeOn('emit')
  public drain = new Effect(() => this.stats.character.health, () => {
    return new Decimal(1);
  });
}
