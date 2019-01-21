import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Suicide } from './suicide';
import { Reincarnate } from './reincarnate';

@SerializeAllOn('emit', 'store')
export class Character extends Serializable {
  suicide = new Suicide();
  reincarnate = new Reincarnate();
}
