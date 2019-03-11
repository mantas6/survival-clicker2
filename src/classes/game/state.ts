import { Stats } from '@/classes/game/stats';
import { Processes } from '@/classes/game/processes';
import { Actions } from '@/classes/game/actions';
import { Modifiers } from '@/classes/game/modifiers';
import { Measures } from '@/classes/game/measures';
import { Timers } from '@/classes/game/base/modifiers';
import { SerializeOn, Serializable } from '@/classes/game/base/serialization';
import { Globals } from './globals';

export class State extends Serializable {
  @SerializeOn('emit', 'store')
  stats = new Stats();

  @SerializeOn('emit')
  processes = new Processes();

  @SerializeOn('emit', 'store')
  actions = new Actions();

  @SerializeOn('emit')
  modifiers = new Modifiers();

  @SerializeOn('emit')
  measures = new Measures();

  @SerializeOn('emit', 'store')
  timers = new Timers();

  @SerializeOn('emit', 'store')
  globals = new Globals();

  get timeMultiplier() {
    return this.modifiers.timeDensity.value;
  }

  // For the time being
  constructor() {
    super();
    this.emitParent();
  }
}
