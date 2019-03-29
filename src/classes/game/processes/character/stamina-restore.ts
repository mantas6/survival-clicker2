import { Process } from '@/classes/game/base/processes/process';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { IgnoreLimits, When } from '@/classes/game/base/processes';

@When(process => process.stats.character.stamina.level.lessThan(1))
export class StaminaRestore extends Process {
  @IgnoreLimits('greaterThanMaximum')
  restoreStamina = new Mutation(() => this.stats.character.stamina, () => {
    return this.restoreSpeed.add(this.restoreSpeedBoost);
  });

  drainEnergy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-0.5).mul(this.restoreSpeed);
  });

  drainHydration = new Mutation(() => this.stats.character.hydration, () => {
    return new Decimal(-0.5).mul(this.restoreSpeed);
  });

  get restoreSpeed() {
    return this.modifiers.character.regeneration.stamina.restoreSpeed.value;
  }

  get restoreSpeedBoost() {
    return this.modifiers.character.regeneration.stamina.restoreSpeedBoost.value;
  }
}
