import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Banking } from './banking';
import { InformationTechnology } from './information-technology';

@SerializeAllOn('emit', 'store')
export class Investment extends Serializable {
  banking = new Banking();
  informationTechnology = new InformationTechnology();
}
