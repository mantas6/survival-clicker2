import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

export class Hydration extends Modifier {
  compute(cumulated: Decimal) {
    return new Decimal(0).add(cumulated);
  }
}
