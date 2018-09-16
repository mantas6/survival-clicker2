import { Health } from './health';
import { Serializable } from '@/classes/game/base/serializable';

export class Character extends Serializable {
  public health = new Health();
}
