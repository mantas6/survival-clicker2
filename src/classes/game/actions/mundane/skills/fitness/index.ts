import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Workout } from './workout';

@SerializeAllOn('emit', 'store')
export class Fitness extends Serializable {
  workout = new Workout();
}
