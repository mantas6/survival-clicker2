import Decimal from 'decimal.js';
import { Mutation } from '@/classes/game/base/mutations/mutation';
import { ToggleAction, NoMultiplier, Persist, NoFavorites, Unlocks } from '@/classes/game/base/actions';

@NoMultiplier
@Persist
@NoFavorites
export class Temperature extends ToggleAction {
  @Unlocks
  points = new Mutation(() => this.stats.incarnation.points, () => {
    if (this.timesCalculated.greaterThan(0)) {
      return new Decimal(0);
    }

    return new Decimal(-50);
  });
}
