import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { CheapFood } from './cheap-food';
import { CheapWater } from './cheap-water';

@SerializeAllOn('emit', 'store')
export class Consumables extends Serializable {
  cheapFood = new CheapFood();

  cheapWater = new CheapWater();
}
