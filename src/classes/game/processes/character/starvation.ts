import { Process, When } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@When(process => process.stats.character.energy.value.isZero())
export class Starvation extends Process {
  drainHealth = new Mutation(() => this.stats.character.health, () => {
    return new Decimal(-0.1);
  });
}
