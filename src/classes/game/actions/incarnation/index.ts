import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Modules } from './modules';

@SerializeAllOn('emit', 'store')
export class Incarnation extends Serializable {
  modules = new Modules();
}
