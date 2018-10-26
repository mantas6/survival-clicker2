import { Calculable, CalculationOptions } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';

export class Timer {
  private calculable: Calculable;
  private durationFunc: () => Decimal;
  private timePassed = new Decimal(0);

  constructor(calculable: Calculable, durationFunc: () => Decimal) {
    this.calculable = calculable;
    this.durationFunc = durationFunc;
  }

  calculate(opts: CalculationOptions) {
    if (this.calculable.validate(opts)) {
      this.calculable.calculate(opts);
    }

    this.timePassed = this.timePassed.add(opts.multiplier);
  }

  hasTimedOut() {
    const duration = this.durationFunc();
    return this.timePassed.greaterThan(duration);
  }
}
