import { Stat } from '@/classes/game/stat';
import { Character } from './character';
import { Finance } from './finance';

export class State {
  public character = new Character();
  public finance = new Finance();
}
