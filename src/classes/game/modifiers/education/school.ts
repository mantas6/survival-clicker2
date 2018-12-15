import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

export class School extends Modifier {
  compute() {
    return new Decimal(0).add(this.actions.education.primary.school.timesCalculated);
  }

  get hasFinished() {
    return this.compute().greaterThanOrEqualTo(3);
  }
}
