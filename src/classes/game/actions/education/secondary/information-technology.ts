import { Action, VisibleWhen, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import { Effect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
@UnlocksWhen(action => action.stats.education.school.value.greaterThanOrEqualTo(5))
@VisibleWhen(action => action.stats.education.informationTechnology.value.lessThan(10))
export class InformationTechnology extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    const timesBought = this.stats.education.informationTechnology.value;
    const base = new Decimal(150).mul(new Decimal(2).pow(timesBought));
    return this.modifiers.finance.costAdd.value.mul(base).ceil().negated();
  });

  energy = new Effect({
    modifier: () => this.modifiers.character.intake.energy,
    duration: () => 120,
    value: () => new Decimal(-0.5),
  });

  informationTechnology = new Mutation(() => this.stats.education.informationTechnology, () => {
    return new Decimal(1);
  });
}
