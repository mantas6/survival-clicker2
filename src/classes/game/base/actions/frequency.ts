import Decimal from 'decimal.js';
import { Transformable } from '@/classes/game/base/transformable';
import { CalculationOptions } from '@/classes/game/base/mutations';
import { SerializeOn } from '../serialization';

export abstract class Frequency extends Transformable {
  @SerializeOn('emit', 'store')
  private heat = new Decimal(0);

  get riseSensitivity(): Decimal {
    return new Decimal(1);
  }

  get fallSensitivity(): Decimal {
    return new Decimal(1);
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
