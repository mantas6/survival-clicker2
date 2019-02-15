import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Deposit } from './deposit';

@SerializeAllOn('emit', 'store')
export class Banking extends Serializable {
  deposit = new Deposit();
}
