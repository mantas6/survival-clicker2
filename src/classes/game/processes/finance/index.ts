import { Investment } from './investment';
import { ProcessContainer } from '@/classes/game/base/processes';

export class Finance extends ProcessContainer {
  public investment = new Investment();
}
