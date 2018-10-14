import { Process } from '@/classes/game/base/processes/process';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';

export class StaminaRestore extends Process {
  public restoreStamina = new Effect(() => this.stats.character.stamina, () => {
    return new Decimal(1);
  });

  public drainEnergy = new Effect(() => this.stats.character.energy, () => {
    return new Decimal(-1);
  });

  public drainHydration = new Effect(() => this.stats.character.hydration, () => {
    return new Decimal(-2);
  });
}
