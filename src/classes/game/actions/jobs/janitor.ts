import { Action, IgnoreLimits } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';
import { SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit')
export class Janitor extends Action {
  @IgnoreLimits('lessThanMinimum')
  stamina = new Effect(() => this.stats.character.stamina, value => {
    return value.sub(5);
  });

  money = new Effect(() => this.stats.finance.money, value => {
    return value.add(1);
  });
}
