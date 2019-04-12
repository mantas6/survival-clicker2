import Decimal from 'decimal.js';
import { Transformable } from '@/classes/game/base/transformable';
import { CalculationOptions } from '@/classes/game/base/mutations';
import { SerializeOn } from '../serialization';

export abstract class Frequency extends Transformable {
  @SerializeOn('emit', 'store')
  private heat = new Decimal(0);

  addUse(opts: CalculationOptions) {
    this.heat = this.heat.add(this.riseBy(opts).mod(opts.multiplier));
  }

  onClock() {
    super.onClock();

    if (this.heat.greaterThan(0)) {
      const multiplier = new Decimal(1);
      this.heat = this.heat.minus(this.fallBy({ multiplier }));
    }
  }

  protected riseBy(opts: CalculationOptions): Decimal {
    return new Decimal(1);
  }

  protected fallBy(opts: CalculationOptions): Decimal {
    return new Decimal(1);
  }
}
