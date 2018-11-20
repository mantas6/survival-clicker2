import { Action, VisibleWhen, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
@VisibleWhen(action => action.stats.education.driversLicense.value.isZero())
@UnlocksWhen(action => action.stats.education.school.value.greaterThanOrEqualTo(1))
export class DriversLicense extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.helpers.moneyCost(200);
  });

  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-10).div(this.modifiers.character.concentration.value);
  });

  driversLicense = new Mutation(() => this.stats.education.driversLicense, () => {
    return new Decimal(1);
  });
}
