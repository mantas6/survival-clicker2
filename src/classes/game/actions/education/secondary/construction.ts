import { Action, VisibleWhen, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
@UnlocksWhen(action => action.stats.education.school.value.greaterThanOrEqualTo(3))
@VisibleWhen(action => action.stats.education.construction.value.lessThan(10))
export class Construction extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.growthMoneyCost(this.stats.education.construction.value, 100, 1.5);
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-20);
  });

  construction = new Mutation(() => this.stats.education.construction, () => {
    return new Decimal(1);
  });
}
