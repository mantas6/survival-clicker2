import { Action } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

export class One extends Action {
  points = new Mutation(() => this.stats.incarnation.points, () => {
    return new Decimal(1);
  });
}
