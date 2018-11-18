import { State } from '@/classes/game/state';
import { Stats } from '@/classes/game/stats';
import { Serializable } from '@/classes/game/base/serialization/serializable';
import { NonChild } from '@/classes/game/base/state-node';
import { Modifiers } from '@/classes/game/modifiers';
import { Helpers } from '@/classes/game/helpers';

export abstract class SerializableWithReference extends Serializable {
  // Do we really need these NoChild exclusions, since it is not an instanceof StateNode
  @NonChild
  get state(): State {
    return this.root as State;
  }

  @NonChild
  get stats(): Stats {
    return this.state.stats;
  }

  @NonChild
  get modifiers(): Modifiers {
    return this.state.modifiers;
  }

  @NonChild
  get helpers(): Helpers {
    return this.state.helpers;
  }
}
