import { Stats } from '@/classes/game/stats';
import { Processes } from '@/classes/game/processes';
import { StateNode } from '@/classes/game/base/state-node';
import { Actions } from '@/classes/game/actions';
import { Modifiers } from '@/classes/game/modifiers';

export class State extends StateNode {
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
