import Decimal from 'decimal.js';
import { Transformable } from '@/classes/game/base/transformable';
import { CalculationOptions } from '@/classes/game/base/mutations';

interface FrequencyOptions {
  riseSensitivity: Decimal.Value;
  fallSensitivity: Decimal.Value;
}

export class Frequency extends Transformable {
  private heat = new Decimal(0);

  private riseSensitivity: Decimal;
  private fallSensitivity: Decimal;

  constructor(opts: FrequencyOptions) {
    super();
    this.riseSensitivity = new Decimal(opts.riseSensitivity);
    this.fallSensitivity = new Decimal(opts.fallSensitivity);
  }

  addUse(opts: CalculationOptions) {
    this.heat = this.heat.add(opts.multiplier.mod(this.riseSensitivity));
  }

  onClock() {
    super.onClock();

    if (this.heat.greaterThan(0)) {
      this.heat = this.heat.minus(new Decimal(1).mod(this.fallSensitivity));
    }
  }
}
