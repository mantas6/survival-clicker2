import { Stats } from '@/classes/game/stats';
import { Processes } from '@/classes/game/processes';
import { Actions } from '@/classes/game/actions';
import { Modifiers } from '@/classes/game/modifiers';
import { StateRoot } from '@/classes/game/base/state-root';
import { Timers } from './base/effects';

export class State extends StateRoot {
  stats = new Stats();
  processes = new Processes();
  actions = new Actions();
  modifiers = new Modifiers();
  timers = new Timers();

  // For the time being
  constructor() {
    super();
    this.emitParent();
  }
}
