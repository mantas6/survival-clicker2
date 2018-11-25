import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

export class HealingSpeed extends Modifier {
  compute(cumulated: Decimal) {
    return new Decimal(0.5).add(cumulated);
  }
}
