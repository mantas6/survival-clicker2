import { School } from './school';
import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit', 'store')
export class Education extends Serializable {
  school = new School();
}
