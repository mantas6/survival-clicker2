import { Taxes } from './taxes';
import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit', 'store')
export class Finance extends Serializable {
  taxes = new Taxes();
}
