import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit', 'store')
export class Globals extends SerializableWithReference {
  isPaused: boolean = false;
}
