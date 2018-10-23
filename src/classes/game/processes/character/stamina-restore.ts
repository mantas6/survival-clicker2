import { Process } from '@/classes/game/base/processes/process';
import { Effect } from '@/classes/game/base/effects';

export class StaminaRestore extends Process {
  restoreStamina = new Effect(() => this.stats.character.stamina, value => {
    return value.add(1);
  });

  drainEnergy = new Effect(() => this.stats.character.energy, value => {
    return value.sub(1);
  });

  drainHydration = new Effect(() => this.stats.character.hydration, value => {
    return value.sub(2);
  });
}
