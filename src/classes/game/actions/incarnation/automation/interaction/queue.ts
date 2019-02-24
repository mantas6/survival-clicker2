import Decimal from 'decimal.js';
import { Mutation } from '@/classes/game/base/mutations/mutation';
import { ToggleAction, NoMultiplier, Persist, NoFavorites } from '@/classes/game/base/actions';

@NoMultiplier
@Persist
@NoFavorites
export class Queue extends ToggleAction {
  points = new Mutation(() => this.stats.incarnation.points, () => {
    if (this.timesCalculated.greaterThan(0)) {
      return new Decimal(0);
    }

    return new Decimal(-100);
  });
}
