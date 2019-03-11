import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';
import { Finance } from './finance';

@SerializeAllOn('emit')
export class Measures extends SerializableWithReference {
  finance = new Finance();
}
