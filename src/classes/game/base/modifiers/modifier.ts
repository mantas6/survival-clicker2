import Decimal from 'decimal.js';

export class Modifier {
  private computeFunc: () => Decimal;

  constructor(computeFunc: () => Decimal) {
    this.computeFunc = computeFunc;
  }

  get value() {
    return this.computeFunc();
  }
}
