import { Calculable } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';

export class Timer {
  private calculable: Calculable;
  private durationLeft: Decimal;

  constructor(calculable: Calculable, duration: Decimal) {
    this.calculable = calculable;
    this.durationLeft = duration;
  }

  public calculate() {
    this.calculable.calculate();
  }
}
