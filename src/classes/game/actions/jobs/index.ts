import { Serializable, SerializeOn } from '@/classes/game/base/serialization';
import { Janitor } from './janitor';

export class Jobs extends Serializable {
  @SerializeOn('emit')
  public janitor = new Janitor();
}
