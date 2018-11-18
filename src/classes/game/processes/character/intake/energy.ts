import { Process, When } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';

@When(process => !process.modifiers.character.intake.energy.value.isZero())
export class Energy extends Process {
  restoreEnergy = new Mutation(() => this.stats.character.energy, () => {
    return this.modifiers.character.intake.energy.value;
  });
}
