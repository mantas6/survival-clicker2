import { Character } from './character';
import { Skills } from './skills';
import { Finance } from './finance';
import { Incarnation } from './incarnation';
import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit', 'store')
export class Stats extends Serializable {
  character = new Character();
  skills = new Skills();

  finance = new Finance();

  incarnation = new Incarnation();
}
