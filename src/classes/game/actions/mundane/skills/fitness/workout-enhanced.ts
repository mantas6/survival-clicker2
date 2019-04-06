import { Action, UnlocksWhen, NoMultiplier, NoFavorites } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { When } from '@/classes/game/base/processes';

@UnlocksWhen(action => action.stats.skills.fitness.level.value.greaterThanOrEqualTo(5))
@When<Action>(action => !action.isCalculatedOnce)
@NoMultiplier
@NoFavorites
export class WorkoutEnhanced extends Action {
  learningPoints = new Mutation(() => this.stats.skills.learningPoints, () => {
    return new Decimal(-3);
  });
}
