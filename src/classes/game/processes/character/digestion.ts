import { Process } from '@/classes/game/base/processes/process';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';

export class Digestion extends Process {
  drainStomach = new Effect(() => this.stats.character.stomach, () => {
    return new Decimal(-3);
  });
}
