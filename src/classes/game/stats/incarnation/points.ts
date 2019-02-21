import { Value, Persist } from '@/classes/game/base/stats';
import { SerializeOn } from '@/classes/game/base/serialization';

@Persist
export class Points extends Value {
  readonly default = 0;

  @SerializeOn('emit')
  get total() {
    return this.value.add(this.stats.incarnation.currentPoints.value);
  }
}
