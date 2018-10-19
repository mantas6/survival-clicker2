import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';
import { Character } from './character';
import { Finance } from './finance';

@SerializeAllOn('emit')
export class Modifiers extends SerializableWithReference {
  character = new Character();
  finance = new Finance();
}
