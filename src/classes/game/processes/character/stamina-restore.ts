import { Process } from '@/classes/game/base/processes/process';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';

export class StaminaRestore extends Process {
  restoreStamina = new Effect(() => this.stats.character.stamina, () => {
    return new Decimal(1);
  });

  drainEnergy = new Effect(() => this.stats.character.energy, () => {
    return new Decimal(-1);
  });

  drainHydration = new Effect(() => this.stats.character.hydration, () => {
    return new Decimal(-2);
  });
}
