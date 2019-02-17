import { Temperature } from './temperature';
import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit', 'store')
export class Character extends Serializable {
  temperature = new Temperature();
}
