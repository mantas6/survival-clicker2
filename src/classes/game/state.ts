import { Stats } from '@/classes/game/stats';
import { Processes } from '@/classes/game/processes';
import { Actions } from '@/classes/game/actions';
import { Modifiers } from '@/classes/game/modifiers';
import { StateRoot } from '@/classes/game/base/state-root';
import { Timers } from '@/classes/game/base/effects';
import { SerializeOn } from '@/classes/game/base/serialization';

export class State extends StateRoot {
  @SerializeOn('emit', 'store')
  stats = new Stats();

  processes = new Processes();

  @SerializeOn('emit')
  actions = new Actions();

  @SerializeOn('emit')
  modifiers = new Modifiers();

  @SerializeOn('emit')
  timers = new Timers();

  // For the time being
  constructor() {
    super();
    this.emitParent();
  }
}
