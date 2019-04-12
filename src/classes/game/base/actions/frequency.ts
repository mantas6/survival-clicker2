import Decimal from 'decimal.js';
import { Transformable } from '@/classes/game/base/transformable';

export class Frequency extends Transformable {
  private heat = new Decimal(0);

  addUse() {
    this.heat = this.heat.add(1);
  }

  onClock() {
    super.onClock();

    if (this.heat.greaterThan(0)) {
      this.heat = this.heat.minus(1);
    }
  }
}
