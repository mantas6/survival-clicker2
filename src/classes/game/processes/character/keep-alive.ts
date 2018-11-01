import { Process, When } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';

export class KeepAlive extends Process {
  drainEnergy = new Effect(() => this.stats.character.energy, () => {
    return new Decimal(-0.5);
  });

  drainHydration = new Effect(() => this.stats.character.hydration, () => {
    return new Decimal(-0.5);
  });
}
