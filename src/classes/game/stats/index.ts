import { Character } from './character';
import { Finance } from './finance';
import { Serializable } from '@/classes/game/base/serializable';

export class Stats extends Serializable {
  public character = new Character();
  public finance = new Finance();
}
