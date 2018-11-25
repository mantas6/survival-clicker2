import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

export class DigestionSpeed extends Modifier {
  compute(cumulated: Decimal) {
    return new Decimal(2).add(cumulated);
  }
}
