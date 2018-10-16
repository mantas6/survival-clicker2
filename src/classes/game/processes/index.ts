import { Character } from './character';
import { Finance } from './finance';
import { ProcessContainer } from '@/classes/game/base/processes';

export class Processes extends ProcessContainer {
  character = new Character();
  finance = new Finance();
}
