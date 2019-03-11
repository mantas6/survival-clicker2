import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';
import { Income } from './income';

@SerializeAllOn('emit')
export class Finance extends SerializableWithReference {
  income = new Income();
}
