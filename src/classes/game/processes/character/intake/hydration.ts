import { Process, When } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';

@When(process => !process.modifiers.character.intake.hydration.value.isZero())
export class Hydration extends Process {
  restoreHydration = new Mutation(() => this.stats.character.hydration, () => {
    return this.modifiers.character.intake.hydration.value;
  });
}
