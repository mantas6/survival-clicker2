import { Calculable, CalculationOptions } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';

export class Timer {
  private calculable: Calculable;
  private duration: Decimal;

  constructor(calculable: Calculable, duration: Decimal) {
    this.calculable = calculable;
    this.duration = duration;
  }

  calculate(opts: CalculationOptions) {
    if (this.calculable.validate(opts)) {
      this.calculable.calculate(opts);
    }

    this.duration = this.duration.sub(opts.multiplier);
  }

  hasTimedOut() {
    return this.duration.lessThanOrEqualTo(0);
  }
}
