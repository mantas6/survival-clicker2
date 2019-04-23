import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { General } from './general';
import { Stats } from './stats';

@SerializeAllOn('emit', 'store')
export class Development extends Serializable {
  general = new General();
  stats = new Stats();

  get shouldSerializeOnEmit() {
    return process.env.NODE_ENV !== 'production';
  }

  get shouldSerializeOnStore() {
    return process.env.NODE_ENV !== 'production';
  }
}
