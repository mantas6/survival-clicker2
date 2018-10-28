import { Process, When } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';

@When(process => process.stats.character.hydration.value.isZero())
export class Dehydration extends Process {
  drainHealth = new Effect(() => this.stats.character.health, () => {
    return new Decimal(-5);
  });
}