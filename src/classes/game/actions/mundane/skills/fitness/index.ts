import { SerializeAllOn, SerializableWithReference, SerializeOn } from '@/classes/game/base/serialization';
import { Workout } from './workout';
import { WorkoutEnhanced } from './workout-enhanced';
import { TagName } from '@/classes/game/base/serialization/serializable';

@SerializeAllOn('emit', 'store')
export class Fitness extends SerializableWithReference {
  workout = new Workout();
  workoutEnhanced = new WorkoutEnhanced();

  @SerializeOn('emit')
  get skill() {
    return this.stats.skills.fitness;
  }

  serialize(tagName: TagName) {
    if (tagName === 'emit') {
      if (this.skill.level.value.greaterThan(0)) {
        return super.serialize(tagName);
      }
    } else {
      return super.serialize(tagName);
    }
  }
}
