import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { General } from './general';

@SerializeAllOn('emit', 'store')
export class Development extends Serializable {
  general = new General();
}
