import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Immortality } from './immortality';

@SerializeAllOn('emit', 'store')
export class Character extends Serializable {
  immortality = new Immortality();
}
