import { Serializable, SerializeAllOn, SerializeOn } from '@/classes/game/base/serialization';
import { Mundane } from './mundane';
import { Incarnation } from './incarnation';
import { Development } from './development';
import { Other } from './other';

@SerializeAllOn('emit', 'store')
export class Actions extends Serializable {
  mundane = new Mundane();
  incarnation = new Incarnation();

  development = new Development();

  @SerializeOn('store')
  other = new Other();
}
