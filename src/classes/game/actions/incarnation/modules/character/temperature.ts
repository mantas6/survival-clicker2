import Decimal from 'decimal.js';
import { Mutation } from '@/classes/game/base/mutations/mutation';
import { ToggleAction, NoMultiplier } from '@/classes/game/base/actions';

@NoMultiplier
export class Temperature extends ToggleAction {
  points = new Mutation(() => this.stats.incarnation.points, () => {
    if (this.timesCalculated.greaterThan(0)) {
      return new Decimal(0);
    }

    return new Decimal(-50);
  });
}
