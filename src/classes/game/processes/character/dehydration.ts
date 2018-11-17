import { Process, When, IgnoreLimits } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@When(process => process.stats.character.hydration.value.isZero())
export class Dehydration extends Process {
  @IgnoreLimits('lessThanMinimum')
  drainHealth = new Mutation(() => this.stats.character.health, () => {
    return new Decimal(-3).div(this.modifiers.character.healthPreservationMultiplier.value);
  });
}
