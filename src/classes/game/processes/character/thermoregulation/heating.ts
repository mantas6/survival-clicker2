import { Process, When } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { TemperatureMutation } from '@/classes/game/base/templates/mutations/temperature-mutation';

@When(process => process.stats.character.temperature.value.lessThan(36.4))
export class Heating extends Process {
  temperature = new TemperatureMutation(() => this.stats.character.temperature, () => {
    return new Decimal(0.1);
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-0.5);
  });
}
