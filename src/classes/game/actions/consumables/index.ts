import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Food } from './food';
import { Drinks } from './drinks';

@SerializeAllOn('emit', 'store')
export class Consumables extends Serializable {
  food = new Food();
  drinks  = new Drinks();
}
