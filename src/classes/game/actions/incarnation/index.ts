import { SerializeAllOn, SerializableWithReference } from '@/classes/game/base/serialization';
import { Modules } from './modules';
import { Automation } from './automation';

@SerializeAllOn('emit', 'store')
export class Incarnation extends SerializableWithReference {
  modules = new Modules();
  automation = new Automation();

  get shouldTraverse() {
    return !this.state.globals.alive.value;
  }

  get shouldSerializeOnEmit() {
    return !this.state.globals.alive.value;
  }
}
