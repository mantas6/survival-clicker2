import { Serializable, SerializeAllOn, SerializeOn } from '@/classes/game/base/serialization';
import { Mundane } from './mundane';
import { Incarnation } from './incarnation';
import { Other } from './other';

@SerializeAllOn('emit', 'store')
export class Actions extends Serializable {
  mundane = new Mundane();
  incarnation = new Incarnation();

  @SerializeOn('store')
  other = new Other();
}
