import { Process } from '@/classes/game/base/processes/process';
import { Mutation } from '@/classes/game/base/mutations';
import { IgnoreLimits } from '@/classes/game/base/processes';

export class Digestion extends Process {
  @IgnoreLimits('lessThanMinimum')
  drainStomach = new Mutation(() => this.stats.character.stomach, () => {
    return this.modifiers.character.digestionSpeed.value.negated();
  });
}
