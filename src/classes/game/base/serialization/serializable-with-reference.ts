import { State } from '@/classes/game/state';
import { Stats } from '@/classes/game/stats';
import { Serializable } from '@/classes/game/base/serialization/serializable';
import { NonChild } from '@/classes/game/base/state-node';

export abstract class SerializableWithReference extends Serializable {
  @NonChild
  get state(): State {
    return this.root as State;
  }

  @NonChild
  get stats(): Stats {
    return this.state.stats;
  }
}
