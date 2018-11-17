import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Construction } from './construction';
import { InformationTechnology } from './information-technology';
import { Medicine } from './medicine';
import { Veterinary } from './veterinary';

@SerializeAllOn('emit', 'store')
export class Secondary extends Serializable {
  construction = new Construction();
  informationTechnology = new InformationTechnology();
  medicine = new Medicine();
  veterinary = new Veterinary();
}
