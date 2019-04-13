import Decimal from 'decimal.js';
import { Transformable, Transform } from '@/classes/game/base/transformable';
import { CalculationOptions } from '@/classes/game/base/mutations';
import { SerializeOn, UnserializeAs, SerializeAs } from '@/classes/game/base/serialization';
import { last } from '@/utils/method';

interface Tick {
  count: Decimal;
}

export class Frequency extends Transformable {
  @SerializeOn('emit', 'store')
  @UnserializeAs<Tick[]>(input => input.toString().split(',').map(item => ({ count: new Decimal(item) })))
  @SerializeAs<Tick[]>(input => input.map(item => item.count.valueOf()).join(','))
  @Transform<Tick[], Frequency>('reset', () => [])

  private ticks: Tick[] = [];

  addUse(opts: CalculationOptions) {
    const tick = last(this.ticks);
    if (tick) {
      tick.count = tick.count.add(opts.multiplier);
    }
  }

  onClock() {
    super.onClock();
    this.ticks.push({ count: new Decimal(0) });

    if (this.ticks.length > 60) {
      this.ticks.shift();
    }
  }

  ofDuration(duration: number): Decimal {
    const ticks = this.ticks.slice(-duration);

    let total = new Decimal(0);

    for (const tick of ticks) {
      total = total.add(tick.count);
    }

    return total.div(duration);
  }
}
