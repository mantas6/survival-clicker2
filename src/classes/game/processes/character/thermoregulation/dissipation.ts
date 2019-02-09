import { Process } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

export class Dissipation extends Process {
  temperature = new Mutation(() => this.stats.character.temperature, () => {
    return new Decimal(-0.01);
  });
}
