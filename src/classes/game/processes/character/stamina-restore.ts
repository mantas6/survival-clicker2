import { Process } from '@/classes/game/base/processes/process';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

export class StaminaRestore extends Process {
  restoreStamina = new Mutation(() => this.stats.character.stamina, () => {
    return this.modifiers.character.staminaRestoreSpeed.value;
  });

  drainEnergy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-1);
  });

  drainHydration = new Mutation(() => this.stats.character.hydration, () => {
    return new Decimal(-2);
  });
}
