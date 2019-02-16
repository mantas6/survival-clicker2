import Decimal from 'decimal.js';
import { ClothingAction } from '@/classes/game/base/actions/clothing-action';
import { Mutation } from '@/classes/game/base/mutations/mutation';

export class Temperature extends ClothingAction {
  points = new Mutation(() => this.stats.incarnation.points, () => {
    return new Decimal(-50);
  });
}
