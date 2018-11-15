import { Process } from '@/classes/game/base/processes/process';
import { Mutation } from '@/classes/game/base/mutations';
import { IgnoreLimits } from '@/classes/game/base/processes';
import Decimal from 'decimal.js';

export class Digestion extends Process {
  @IgnoreLimits('lessThanMinimum')
  drainStomach = new Mutation(() => this.stats.character.stomach, () => {
    const cumulated = this.modifiers.character.digestionSpeed.value;
    const absorbLimit = new Decimal(5);

    return Decimal.min(cumulated, absorbLimit).negated();
  });
}
