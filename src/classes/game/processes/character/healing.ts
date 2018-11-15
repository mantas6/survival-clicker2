import { Process, When, IgnoreLimits } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@When(process => process.stats.character.energy.level.greaterThan(0.5))
@When(process => process.stats.character.hydration.level.greaterThan(0.5))
@When(process => process.stats.character.health.level.lessThan(1))
export class Healing extends Process {
  @IgnoreLimits('greaterThanMaximum')
  restoreHealth = new Mutation(() => this.stats.character.health, () => {
    return new Decimal(0.5);
  });

  drainEnergy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-1);
  });

  drainHydration = new Mutation(() => this.stats.character.hydration, () => {
    return new Decimal(-1);
  });
}
