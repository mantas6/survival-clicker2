import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.stats.skills.fitness.level.value.greaterThanOrEqualTo(2))
export class Workout extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(300).neg();
  });
}
