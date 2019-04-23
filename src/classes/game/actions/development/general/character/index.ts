import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Immortality } from './immortality';
import { EmptyStomach } from './empty-stomach';

@SerializeAllOn('emit', 'store')
export class Character extends Serializable {
  immortality = new Immortality();
  emptyStomach = new EmptyStomach();
}
