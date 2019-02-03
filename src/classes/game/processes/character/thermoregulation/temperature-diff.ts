import { Process, When } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';

@When(process => !process.modifiers.character.thermoregulation.temperatureDiff.value.isZero())
export class TemperatureDiff extends Process {
  temperature = new Mutation(() => this.stats.character.temperature, () => {
    return this.modifiers.character.thermoregulation.temperatureDiff.value;
  });
}
