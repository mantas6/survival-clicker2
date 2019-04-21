import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { General } from './general';
import { Stats } from './stats';

@SerializeAllOn('emit', 'store')
export class Development extends Serializable {
  general = new General();
  stats = new Stats();
}
