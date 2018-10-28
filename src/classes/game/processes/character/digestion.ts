import { Process } from '@/classes/game/base/processes/process';
import { Effect } from '@/classes/game/base/effects';
import { IgnoreLimits } from '@/classes/game/base/processes';

export class Digestion extends Process {
  @IgnoreLimits('lessThanMinimum')
  drainStomach = new Effect(() => this.stats.character.stomach, () => {
    return this.modifiers.character.digestionSpeed.value.negated();
  });
}
