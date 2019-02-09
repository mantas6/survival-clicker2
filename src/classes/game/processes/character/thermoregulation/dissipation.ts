import { Process } from '@/classes/game/base/processes';
import Decimal from 'decimal.js';
import { TemperatureMutation } from '@/classes/game/base/templates/mutations/temperature-mutation';

export class Dissipation extends Process {
  temperature = new TemperatureMutation(() => this.stats.character.temperature, () => {
    return new Decimal(-0.01);
  });
}
