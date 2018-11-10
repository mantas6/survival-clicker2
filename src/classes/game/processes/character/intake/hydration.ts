import { Process, When } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@When(process => process.modifiers.character.intake.hydration.value.greaterThan(0))
export class Hydration extends Process {
  restoreHydration = new Mutation(() => this.stats.character.hydration, () => {
    const cumulated = this.modifiers.character.intake.hydration.value;
    const absorbLimit = new Decimal(10);

    return Decimal.min(cumulated, absorbLimit);
  });
}
