import { Action, VisibleWhen, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import { Effect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
@UnlocksWhen(action => action.stats.education.school.value.greaterThanOrEqualTo(5))
@VisibleWhen(action => action.stats.education.construction.value.lessThan(10))
export class Construction extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    const timesBought = this.stats.education.construction.value;
    const base = new Decimal(100).mul(new Decimal(1.5).pow(timesBought));
    return this.modifiers.finance.costAdd.value.mul(base).ceil().negated();
  });

  energy = new Effect({
    modifier: () => this.modifiers.character.intake.energy,
    duration: () => 120,
    value: () => new Decimal(-0.5),
  });

  construction = new Mutation(() => this.stats.education.construction, () => {
    return new Decimal(1);
  });
}
