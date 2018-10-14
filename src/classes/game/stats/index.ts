import { Character } from './character';
import { Finance } from './finance';
import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit')
export class Stats extends Serializable {
  public character = new Character();

  public finance = new Finance();
}
