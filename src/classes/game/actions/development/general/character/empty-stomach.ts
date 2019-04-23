import { Action, NoMultiplier, NoFavorites } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';

@NoMultiplier
@NoFavorites
export class EmptyStomach extends Action {
  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return this.stats.character.stomach.value.mul(0.5).negated();
  });
}
