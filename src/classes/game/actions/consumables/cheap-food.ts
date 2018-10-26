import { Action, Duration } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import { SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit')
export class CheapFood extends Action {
  @Duration(() => 5)
  stamina = new Effect(() => this.stats.character.energy, value => {
    return value.add(1);
  });

  stomach = new Effect(() => this.stats.character.stomach, value => {
    return value.add(1);
  });

  money = new Effect(() => this.stats.finance.money, value => {
    return value.sub(this.modifiers.finance.costAdd.value.mul(1));
  });
}
