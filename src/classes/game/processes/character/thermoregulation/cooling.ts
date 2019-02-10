import { Process, When, IgnoreLimits } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { TemperatureMutation } from '@/classes/game/base/templates/mutations/temperature-mutation';

@When(process => process.stats.character.temperature.value.greaterThan(37.2))
export class Cooling extends Process {
  temperature = new TemperatureMutation(() => this.stats.character.temperature, () => {
    return new Decimal(-0.1);
  });

  @IgnoreLimits('lessThanMinimum')
  energy = new Mutation(() => this.stats.character.hydration, () => {
    return new Decimal(-0.5);
  });
}
