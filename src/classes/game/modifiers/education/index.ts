import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';
import { Medicine } from './medicine';

@SerializeAllOn('emit')
export class Education extends SerializableWithReference {
  medicine = new Medicine();
}
