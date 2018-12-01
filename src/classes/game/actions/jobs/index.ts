import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Educationless } from './educationless';
import { Donor } from './donor';
import { InformationTechnology } from './information-technology';

@SerializeAllOn('emit', 'store')
export class Jobs extends Serializable {
  educationless = new Educationless();
  informationTechnology = new InformationTechnology();
  donor = new Donor();
}
