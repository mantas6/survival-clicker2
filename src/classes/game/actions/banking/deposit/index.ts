import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Investment } from './investment';

@SerializeAllOn('emit', 'store')
export class Deposit extends Serializable {
  investment = new Investment();
}
