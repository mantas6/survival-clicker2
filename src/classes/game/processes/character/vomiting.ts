import { Process, When, IgnoreLimits } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@When(process => process.stats.character.stomach.level.greaterThan(0.9))
export class Vomiting extends Process {
  @IgnoreLimits('lessThanMinimum')
  health = new Mutation(() => this.stats.character.health, () => {
    return new Decimal(-10).div(this.modifiers.character.healthPreservationMultiplier.value);
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return this.stats.character.stomach.value.mul(0.5).negated();
  });
}
