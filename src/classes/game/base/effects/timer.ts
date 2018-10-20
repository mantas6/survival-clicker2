import { Calculable, CalculationOptions } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';

export class Timer {
  private calculable: Calculable;
  private size: Decimal;

  constructor(calculable: Calculable, size: Decimal) {
    this.calculable = calculable;
    this.size = size;
  }

  calculate(opts: CalculationOptions) {
    if (this.calculable.validate(opts)) {
      this.calculable.calculate(opts);
    }

    this.size = this.size.sub(1);
  }

  hasTimedOut() {
    return this.size.greaterThan(0);
  }
}
