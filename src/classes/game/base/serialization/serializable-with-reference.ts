import { State } from '@/classes/game/state';
import { Stats } from '@/classes/game/stats';
import { Serializable } from '@/classes/game/base/serialization/serializable';

export abstract class SerializableWithReference extends Serializable {
  get state(): State {
    return this.root as State;
  }

  get stats(): Stats {
    return this.state.stats;
  }
}
