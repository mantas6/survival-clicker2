import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { One } from './one';
import { Ten } from './ten';
import { Hundred } from './hundred';

@SerializeAllOn('emit', 'store')
export class Money extends Serializable {
  one = new One();
  ten = new Ten();
  hundred = new Hundred();
}
