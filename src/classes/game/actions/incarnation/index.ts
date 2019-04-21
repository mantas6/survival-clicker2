import { SerializeAllOn, SerializableWithReference } from '@/classes/game/base/serialization';
import { Modules } from './modules';
import { Automation } from './automation';

@SerializeAllOn('emit', 'store')
export class Incarnation extends SerializableWithReference {
  modules = new Modules();
  automation = new Automation();
}
