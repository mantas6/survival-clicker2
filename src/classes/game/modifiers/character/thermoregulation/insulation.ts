import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

export class Insulation extends Modifier {
  compute(cumulated: Decimal) {
    return new Decimal(100).add(cumulated);
  }
}
