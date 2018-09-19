import { Process } from '@/classes/game/base/processes/process';
import { Effect } from '@/classes/game/base/processes/effect';
import Decimal from 'decimal.js';

export class StaminaRestore extends Process {
  // First argument needs to have reference to stats (TODO)
  public drain = new Effect(this.stats.character.health, () => {
    return new Decimal(1);
  });
}
