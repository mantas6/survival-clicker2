import { Serializable, SerializeAllOn, SerializeOn } from '@/classes/game/base/serialization';
import { Fitness } from './fitness';
import { LearningPoints } from './learning-points';
import { traverse } from '@/utils/node';
import { Skill } from '@/classes/game/base/stats';
import Decimal from 'decimal.js';

@SerializeAllOn('emit', 'store')
export class Skills extends Serializable {
  learningPoints = new LearningPoints();

  fitness = new Fitness();

  @SerializeOn('emit')
  get totalLevel() {
    let total = new Decimal(0);

    for (const node of traverse(this)) {
      if (node instanceof Skill) {
        total = total.add(node.level.value);
      }
    }

    return total;
  }
}
