import { SerializableWithReference } from '@/classes/game/base/serialization';
import { Character } from './character';

export class Modifiers extends SerializableWithReference {
  character = new Character();
}
