import { State } from '@/classes/game/state';
import { Processes } from '@/classes/game/processes';

export class Session {
  public state = new State();
  public processes = new Processes();
}