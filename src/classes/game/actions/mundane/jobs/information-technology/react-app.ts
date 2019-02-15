import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.modifiers.education.informationTechnology.value.greaterThanOrEqualTo(4))
export class ReactApp extends Action {
  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-30).div(this.modifiers.character.concentration.value);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(300);
  });
}
