import { Character } from './character';
import { Finance } from './finance';
import { Serializable, Tag } from '@/classes/game/base/serializable';

export class Stats extends Serializable {
  @Tag('emit')
  public character = new Character();
  @Tag('emit')
  public finance = new Finance();
}
