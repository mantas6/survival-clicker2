import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Janitor } from './janitor';

@SerializeAllOn('emit')
export class Jobs extends Serializable {
  janitor = new Janitor();
}
