import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Suicide } from './suicide';

@SerializeAllOn('emit', 'store')
export class Character extends Serializable {
  suicide = new Suicide();
}
