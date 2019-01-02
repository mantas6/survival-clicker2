import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

export class Energy extends Modifier {
  compute(cumulated: Decimal) {
    return new Decimal(0).add(cumulated);
  }

  get max() {
    const { value, max } = this.stats.character.energy;

    return max.sub(value);
  }
}
