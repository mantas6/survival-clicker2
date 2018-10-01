import { Health } from './health';
import { Serializable, SerializeOn } from '@/classes/game/base/serialization';

export class Character extends Serializable {
  @SerializeOn('emit')
  public health = new Health();
}
