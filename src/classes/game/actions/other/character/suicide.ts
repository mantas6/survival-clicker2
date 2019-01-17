import { Action } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit')
export class Suicide extends Action {
  health = new Mutation(() => this.stats.character.health, () => {
    return this.stats.character.health.value.neg();
  });
}
