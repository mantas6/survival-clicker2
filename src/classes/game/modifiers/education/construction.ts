import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

export class Construction extends Modifier {
  compute() {
    return new Decimal(0).add(this.actions.education.secondary.construction.timesCalculated);
  }
}
