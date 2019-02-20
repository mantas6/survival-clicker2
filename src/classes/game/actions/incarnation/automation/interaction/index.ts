import { Multiplier } from './multiplier';
import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit', 'store')
export class Interaction extends Serializable {
  multiplier = new Multiplier();
}
