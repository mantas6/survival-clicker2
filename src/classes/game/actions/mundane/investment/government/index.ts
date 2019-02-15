import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { BribeTaxes } from './bribe-taxes';

@SerializeAllOn('emit', 'store')
export class Government extends Serializable {
  bribeTaxes = new BribeTaxes();
}
