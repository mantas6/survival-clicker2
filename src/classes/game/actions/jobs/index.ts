import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Educationless } from './educationless';

@SerializeAllOn('emit', 'store')
export class Jobs extends Serializable {
  educationless = new Educationless();
}
