import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

export class StaminaRestoreSpeed extends Modifier {
  compute(cumulated: Decimal) {
    return new Decimal(1)
      .add(this.actions.mundane.skills.fitness.workout.timesCalculated)
      .add(cumulated);
  }
}
