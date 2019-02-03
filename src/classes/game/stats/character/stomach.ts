import { Container } from '@/classes/game/base/stats';
import Decimal from 'decimal.js';

export class Stomach extends Container {
  readonly default = 50;

  get maximum() {
    return new Decimal(100);
  }
}
