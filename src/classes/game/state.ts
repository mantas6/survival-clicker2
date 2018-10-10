import { Stats } from '@/classes/game/stats';
import { Processes } from '@/classes/game/processes';
import { StateNode } from '@/classes/game/base/state-node';
import { Actions } from '@/classes/game/actions';

export class State extends StateNode {
  public stats = new Stats();
  public processes = new Processes();
  public actions = new Actions();

  // For the time being
  constructor() {
    super();
    this.emitParent();
  }
}
