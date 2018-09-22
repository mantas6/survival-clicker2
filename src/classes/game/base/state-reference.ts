import { StateNode } from '@/classes/game/base/state-node';
import { State } from '@/classes/game/state';
import { Stats } from '@/classes/game/stats';

export abstract class StateReference extends StateNode {
  get state(): State {
    return this.root as State;
  }

  get stats(): Stats {
    return this.state.stats;
  }
}
