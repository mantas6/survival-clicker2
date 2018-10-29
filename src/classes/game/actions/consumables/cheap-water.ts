import { Action, Required } from '@/classes/game/base/actions';
import { Duration } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
export class CheapWater extends Action {
  @Duration(() => 5)
  hydration = new Effect(() => this.stats.character.hydration, () => {
    return new Decimal(1);
  });

  stomach = new Effect(() => this.stats.character.stomach, () => {
    return new Decimal(5);
  });

  @Required
  money = new Effect(() => this.stats.finance.money, () => {
    return this.modifiers.finance.costAdd.value.mul(1).negated();
  });
}
