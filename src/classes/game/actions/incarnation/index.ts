import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Modules } from './modules';
import { Automation } from './automation';

@SerializeAllOn('emit', 'store')
export class Incarnation extends Serializable {
  modules = new Modules();
  automation = new Automation();
}
