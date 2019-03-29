import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';
import { Stamina } from './stamina';

@SerializeAllOn('emit')
export class Regeneration extends SerializableWithReference {
  stamina = new Stamina();
}
