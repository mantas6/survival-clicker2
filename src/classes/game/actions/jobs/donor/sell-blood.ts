import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@UnlocksWhen(action => !action.modifiers.education.bloodTest.value.isZero())
export class SellBlood extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(300).times(this.stats.character.health.level).floor();
  });

  health = new Mutation(() => this.stats.character.health, () => {
    return new Decimal(-30);
  });
}
