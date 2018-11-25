import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

export class StaminaRestoreSpeed extends Modifier {
  compute(cumulated: Decimal) {
    return new Decimal(1).add(cumulated);
  }
}