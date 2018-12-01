import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Bricks } from './bricks';
import { HouseFoundation } from './house-foundation';
import { StealEquipment } from './steal-equipment';

@SerializeAllOn('emit', 'store')
export class Construction extends Serializable {
  carryBricks = new Bricks();
  houseFoundation = new HouseFoundation();
  stealEquipment = new StealEquipment();
}
