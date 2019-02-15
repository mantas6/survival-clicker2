import { Action } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';

export class Income extends Action {
  points = new Mutation(() => this.stats.incarnation.points, () => {
    const income = this.modifiers.finance.income.value;
    return income.div(1000);
  });
}
