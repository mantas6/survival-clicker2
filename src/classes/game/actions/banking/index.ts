import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Investment } from './investment';

@SerializeAllOn('emit', 'store')
export class Banking extends Serializable {
  investment = new Investment();
}
