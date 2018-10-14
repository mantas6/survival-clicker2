import { Serializable, SerializeOn } from '@/classes/game/base/serialization';
import { CheapFood } from './cheap-food';
import { CheapWater } from './cheap-water';

export class Consumables extends Serializable {
  @SerializeOn('emit')
  public cheapFood = new CheapFood();

  @SerializeOn('emit')
  public cheapWater = new CheapWater();
}
