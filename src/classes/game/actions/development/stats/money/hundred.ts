import { Action } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

export class Hundred extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(100);
  });
}
