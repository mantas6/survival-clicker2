import { Action, Duration } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import { SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit')
export class CheapWater extends Action {
  @Duration(() => 5)
  hydration = new Effect(() => this.stats.character.hydration, value => {
    return value.add(1);
  });

  stomach = new Effect(() => this.stats.character.stomach, value => {
    return value.add(1);
  });

  money = new Effect(() => this.stats.finance.money, value => {
    return value.sub(this.modifiers.finance.costAdd.value.mul(1));
  });
}
