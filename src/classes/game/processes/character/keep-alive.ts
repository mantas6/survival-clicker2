import { Process, IgnoreLimits } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

export class KeepAlive extends Process {
  @IgnoreLimits('lessThanMinimum')
  drainEnergy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-0.5);
  });

  @IgnoreLimits('lessThanMinimum')
  drainHydration = new Mutation(() => this.stats.character.hydration, () => {
    return new Decimal(-0.5);
  });
}
