import { Serializable, SerializeOn } from '@/classes/game/base/serialization';
import { Investment } from './investment';

export class Banking extends Serializable {
  @SerializeOn('emit')
  public investment = new Investment();
}
