import Decimal from 'decimal.js';
import { Transformable, Transform } from '@/classes/game/base/transformable';
import { CalculationOptions } from '@/classes/game/base/mutations';
import { SerializeOn, UnserializeAs } from '@/classes/game/base/serialization';

export abstract class Frequency extends Transformable {
  @SerializeOn('emit', 'store')
  @UnserializeAs(input => new Decimal(input.toString()))
  @Transform<Decimal, Frequency>('reset', () => new Decimal(0))
  heat = new Decimal(0);

  addUse(opts: CalculationOptions) {
    this.heat = this.heat.add(this.riseBy(opts).times(opts.multiplier));
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
