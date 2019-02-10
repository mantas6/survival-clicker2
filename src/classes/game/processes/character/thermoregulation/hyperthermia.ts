import { Process, When, DisplayWhenCalculated } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@When(process => process.stats.character.temperature.value.greaterThan(38))
@DisplayWhenCalculated
export class Hyperthermia extends Process {
  hydration = new Mutation(() => this.stats.character.hydration, () => {
    return new Decimal(-1);
  });
}
