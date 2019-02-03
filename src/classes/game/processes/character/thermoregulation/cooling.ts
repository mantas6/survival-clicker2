import { Process, When } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@When(process => process.stats.character.temperature.value.greaterThan(37.2))
export class Cooling extends Process {
  temperature = new Mutation(() => this.stats.character.temperature, () => {
    return new Decimal(-0.1);
  });

  energy = new Mutation(() => this.stats.character.hydration, () => {
    return new Decimal(-0.5);
  });
}
