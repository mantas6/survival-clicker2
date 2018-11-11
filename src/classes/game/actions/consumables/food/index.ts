import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { ChocolateBar } from './chocolate-bar';
import { Hamburger } from './hamburger';

@SerializeAllOn('emit', 'store')
export class Food extends Serializable {
  chocolateBar = new ChocolateBar();
  hamburger = new Hamburger();
}
