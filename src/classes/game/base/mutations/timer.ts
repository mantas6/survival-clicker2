import { Calculable, CalculationOptions } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { Effect } from '@/classes/game/base/modifiers';

export class Timer {
  effect: Effect;
  private durationFunc: () => Decimal;
  private timePassed = new Decimal(0);

  constructor(effect: Effect, durationFunc: () => Decimal) {
    this.effect = effect;
    this.durationFunc = durationFunc;
  }

  calculate(opts: CalculationOptions) {
    this.timePassed = this.timePassed.add(opts.multiplier);
  }

  hasTimedOut() {
    const duration = this.durationFunc();
    return this.timePassed.greaterThan(duration);
  }
}
