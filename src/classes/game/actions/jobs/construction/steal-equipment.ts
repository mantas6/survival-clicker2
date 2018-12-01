import { IgnoreLimits } from '@/classes/game/base/processes';
import { Action } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

export class StealEquipment extends Action {
  @IgnoreLimits('lessThanMinimum')
  stamina = new Mutation(() => this.stats.character.stamina, () => {
    return new Decimal(-30);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(100);
  });
}
