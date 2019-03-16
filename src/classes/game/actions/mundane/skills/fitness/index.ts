import { SerializeAllOn, SerializableWithReference, SerializeOn } from '@/classes/game/base/serialization';
import { Workout } from './workout';

@SerializeAllOn('emit', 'store')
export class Fitness extends SerializableWithReference {
  workout = new Workout();

  @SerializeOn('emit')
  get skill() {
    return this.stats.skills.fitness;
  }
}
