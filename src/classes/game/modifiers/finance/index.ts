import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';
import { Income } from './income';
import { Taxes } from './taxes';

@SerializeAllOn('emit')
export class Finance extends SerializableWithReference {
  income = new Income();
  taxes = new Taxes();
}
