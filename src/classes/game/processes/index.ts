import { Character } from './character';
import { Finance } from './finance';
import { ProcessContainer } from '@/classes/game/base/processes';

export class Processes extends ProcessContainer {
  public character = new Character();
  public finance = new Finance();
}
