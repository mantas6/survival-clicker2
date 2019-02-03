import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

export class TemperatureGain extends Modifier {
  compute(cumulated: Decimal) {
    return new Decimal(0).add(cumulated);
  }
}
