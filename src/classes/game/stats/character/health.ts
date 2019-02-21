import { Container } from '@/classes/game/base/stats';
import Decimal from 'decimal.js';

export class Health extends Container {
  readonly default = 100;

  get maximum() {
    return new Decimal(100);
  }

  protected onLessThanMinimum(): void {
    this.state.globals.alive.terminate();
  }
}
