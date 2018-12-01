import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';
import { Character } from './character';
import { Finance } from './finance';
import { Education } from './education';

@SerializeAllOn('emit')
export class Modifiers extends SerializableWithReference {
  character = new Character();
  finance = new Finance();
  education = new Education();
}
