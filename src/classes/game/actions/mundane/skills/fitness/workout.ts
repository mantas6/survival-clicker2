import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { When } from '@/classes/game/base/processes';

@UnlocksWhen(action => action.stats.skills.fitness.level.value.greaterThanOrEqualTo(2))
@When<Action>(action => !action.isCalculatedOnce)
export class Workout extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(50).neg();
  });
}
