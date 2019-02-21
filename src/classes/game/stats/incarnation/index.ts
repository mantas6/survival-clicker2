import { Points } from './points';
import { CurrentPoints } from './current-points';
import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit', 'store')
export class Incarnation extends Serializable {
  points = new Points();
  currentPoints = new CurrentPoints();
}
