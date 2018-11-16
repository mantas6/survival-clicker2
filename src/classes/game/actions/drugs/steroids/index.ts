import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { CorticosteroidPills } from './corticosteroid-pills';

@SerializeAllOn('emit', 'store')
export class Steroids extends Serializable {
  corticosteroidPills = new CorticosteroidPills();
}
