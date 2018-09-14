import { Stats } from '@/classes/game/stats';
import { Processes } from '@/classes/game/processes';

export class State {
  public state = new Stats();
  public processes = new Processes();
}
