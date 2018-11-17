import { Action, VisibleWhen, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import { Effect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
@UnlocksWhen(action => action.stats.education.school.value.greaterThanOrEqualTo(3))
@VisibleWhen(action => action.stats.education.medicine.value.lessThan(10))
export class Medicine extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    const timesBought = this.stats.education.medicine.value;
    const base = new Decimal(200).mul(new Decimal(2).pow(timesBought));
    return this.modifiers.finance.costAdd.value.mul(base).ceil().negated();
  });

  energy = new Effect({
    modifier: () => this.modifiers.character.intake.energy,
    duration: () => 120,
    value: () => new Decimal(-0.5),
  });

  medicine = new Mutation(() => this.stats.education.medicine, () => {
    return new Decimal(1);
  });
}
