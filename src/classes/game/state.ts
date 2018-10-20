import { Stats } from '@/classes/game/stats';
import { Processes } from '@/classes/game/processes';
import { Actions } from '@/classes/game/actions';
import { Modifiers } from '@/classes/game/modifiers';
import { StateRoot } from '@/classes/game/base/state-root';

export class State extends StateRoot {
  stats = new Stats();
  processes = new Processes();
  actions = new Actions();
  modifiers = new Modifiers();

  // For the time being
  constructor() {
    super();
    this.emitParent();
  }
}
