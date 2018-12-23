import { Action } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

export class Taxes extends Action {
  taxes = new Mutation(() => this.stats.finance.taxes, () => {
    return new Decimal(0.001);
  });
}
