import { Process, When, DisplayWhenCalculated, IgnoreLimits } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@When(process => process.stats.character.temperature.value.greaterThan(38))
@DisplayWhenCalculated
export class Hyperpyrexia extends Process {
  @IgnoreLimits('lessThanMinimum')
  health = new Mutation(() => this.stats.character.health, () => {
    return new Decimal(-0.5);
  });
}
