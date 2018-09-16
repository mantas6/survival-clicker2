import { Health } from './health';
import { Serializable, Tag } from '@/classes/game/base/serializable';

export class Character extends Serializable {
  @Tag('emit')
  public health = new Health();
}
