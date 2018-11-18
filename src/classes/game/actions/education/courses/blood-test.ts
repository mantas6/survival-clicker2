import { Action, VisibleWhen, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
@VisibleWhen(action => action.stats.education.bloodTest.value.isZero())
@UnlocksWhen(action => action.stats.education.school.value.greaterThanOrEqualTo(1))
export class BloodTest extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.modifiers.finance.costAdd.value.mul(50).ceil().negated();
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-10);
  });

  bloodTest = new Mutation(() => this.stats.education.bloodTest, () => {
    return new Decimal(1);
  });
}
