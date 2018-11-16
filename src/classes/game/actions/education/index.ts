import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Primary } from './primary';

@SerializeAllOn('emit', 'store')
export class Education extends Serializable {
  primary = new Primary();
}
