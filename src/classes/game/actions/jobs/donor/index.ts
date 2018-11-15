import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { SellBlood } from './sell-blood';

@SerializeAllOn('emit', 'store')
export class Donor extends Serializable {
  sellBlood = new SellBlood();
}
