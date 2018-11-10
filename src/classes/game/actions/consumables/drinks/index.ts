import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { CheapWater } from './cheap-water';

@SerializeAllOn('emit', 'store')
export class Drinks extends Serializable {
  cheapWater = new CheapWater();
}
