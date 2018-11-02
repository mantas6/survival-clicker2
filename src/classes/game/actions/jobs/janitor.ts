import { IgnoreLimits } from '@/classes/game/base/processes';
import { Action } from '@/classes/game/base/actions';
import { Effect } from '@/classes/game/base/effects';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
export class Janitor extends Action {
  @IgnoreLimits('lessThanMinimum')
  stamina = new Effect(() => this.stats.character.stamina, ({ multiplier }) => {
    return new Decimal(-5).times(multiplier);
  });

  money = new Effect(() => this.stats.finance.money, ({ multiplier }) => {
    return new Decimal(1).times(multiplier);
  });
}
