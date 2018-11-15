import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Educationless } from './educationless';
import { Donor } from './donor';

@SerializeAllOn('emit', 'store')
export class Jobs extends Serializable {
  educationless = new Educationless();
  donor = new Donor();
}
