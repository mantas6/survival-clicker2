import { Action, VisibleWhen, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
@UnlocksWhen(action => action.stats.education.school.value.greaterThanOrEqualTo(3))
@VisibleWhen(action => action.stats.education.veterinary.value.lessThan(10))
export class Veterinary extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.growthMoneyCost(this.stats.education.veterinary.value, 150, 2);
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-20);
  });

  veterinary = new Mutation(() => this.stats.education.veterinary, () => {
    return new Decimal(1);
  });
}
