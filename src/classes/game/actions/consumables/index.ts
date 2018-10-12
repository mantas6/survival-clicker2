import { Serializable, SerializeOn } from '@/classes/game/base/serialization';
import { CheapFood } from './cheap-food';

export class Consumables extends Serializable {
  @SerializeOn('emit')
  public cheapFood = new CheapFood();
}
