import { Action } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';

export class Investment extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.modifiers.finance.moneyGain.value;
  });
}
