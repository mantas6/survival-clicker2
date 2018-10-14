import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Investment } from './investment';

@SerializeAllOn('emit')
export class Banking extends Serializable {
  public investment = new Investment();
}
