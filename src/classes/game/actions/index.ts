import { Serializable, SerializeAllOn, SerializeOn } from '@/classes/game/base/serialization';
import { Mundane } from '@/classes/game/actions/mundane';
import { Incarnation } from '@/classes/game/actions/incarnation';
import { Other } from '@/classes/game/actions/other';

@SerializeAllOn('emit', 'store')
export class Actions extends Serializable {
  mundane = new Mundane();
  incarnation = new Incarnation();

  @SerializeOn('store')
  other = new Other();
}
