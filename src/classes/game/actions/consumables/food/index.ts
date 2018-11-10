import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { CheapFood } from './cheap-food';

@SerializeAllOn('emit', 'store')
export class Food extends Serializable {
  cheapFood = new CheapFood();
}
