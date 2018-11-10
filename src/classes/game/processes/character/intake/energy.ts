import { Process, When } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@When(process => process.modifiers.character.intake.energy.value.greaterThan(0))
export class Energy extends Process {
  restoreEnergy = new Mutation(() => this.stats.character.energy, () => {
    const cumulated = this.modifiers.character.intake.energy.value;
    const absorbLimit = new Decimal(10);

    return Decimal.min(cumulated, absorbLimit);
  });
}
