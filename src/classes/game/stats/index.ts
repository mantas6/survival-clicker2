import { Character } from './character';
import { Finance } from './finance';
import { Serializable, SerializeOn } from '@/classes/game/base/serialization';

export class Stats extends Serializable {
  @SerializeOn('emit')
  public character = new Character();
  @SerializeOn('emit')
  public finance = new Finance();
}
