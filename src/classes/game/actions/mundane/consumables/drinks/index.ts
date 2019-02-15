import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Water } from './water';
import { MineralWater } from './mineral-water';

@SerializeAllOn('emit', 'store')
export class Drinks extends Serializable {
  water = new Water();
  mineralWater = new MineralWater();
}
