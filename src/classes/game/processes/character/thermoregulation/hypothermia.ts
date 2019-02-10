import { Process, When, DisplayWhenCalculated, IgnoreLimits } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@When(process => process.stats.character.temperature.value.lessThan(35))
@DisplayWhenCalculated
export class Hypothermia extends Process {
  @IgnoreLimits('lessThanMinimum')
  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-1);
  });
}
