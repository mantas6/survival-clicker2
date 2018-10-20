import { Character } from './character';
import { Finance } from './finance';
import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit', 'store')
export class Stats extends Serializable {
  character = new Character();

  finance = new Finance();
}
