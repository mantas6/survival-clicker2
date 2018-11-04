import { Action, Unlocks } from '@/classes/game/base/actions';
import { Duration } from '@/classes/game/base/processes';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import { Effect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
export class CheapStimulant extends Action {
  @Duration(() => 5)
  restoreStamina = new Effect(() => this.modifiers.character.staminaRestoreSpeed, () => {
    return new Decimal(5);
  });

  @Unlocks
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.modifiers.finance.costAdd.value.mul(10).ceil().negated();
  });
}
