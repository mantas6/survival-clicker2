import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { CheapFood } from './cheap-food';
import { CheapWater } from './cheap-water';

@SerializeAllOn('emit')
export class Consumables extends Serializable {
  public cheapFood = new CheapFood();

  public cheapWater = new CheapWater();
}
