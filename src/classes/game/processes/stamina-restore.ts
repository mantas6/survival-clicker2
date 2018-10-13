import { Process } from '@/classes/game/base/processes/process';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';
import { SerializeOn } from '@/classes/game/base/serialization';

export class StaminaRestore extends Process {
  @SerializeOn('emit')
  public restoreStamina = new Effect(() => this.stats.character.stamina, () => {
    return new Decimal(1);
  });

  @SerializeOn('emit')
  public drainEnergy = new Effect(() => this.stats.character.energy, () => {
    return new Decimal(-2);
  });
}
