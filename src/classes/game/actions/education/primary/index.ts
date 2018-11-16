import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { School } from './school';

@SerializeAllOn('emit', 'store')
export class Primary extends Serializable {
  school = new School();
}
