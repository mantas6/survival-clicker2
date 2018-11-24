import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Banking } from './banking';

@SerializeAllOn('emit', 'store')
export class Investment extends Serializable {
  banking = new Banking();
}
