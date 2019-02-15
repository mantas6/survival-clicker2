import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

export class Medicine extends Modifier {
  compute() {
    return new Decimal(0).add(this.actions.mundane.education.courses.medicineLecture.timesCalculated);
  }

  knowsBasics() {
    return this.value.greaterThanOrEqualTo(1);
  }
}
