import { Stat, Container } from '@/classes/game/base/stats';
import Decimal from 'decimal.js';

export class Character {
  public health = new Container({
    default: 100,

    maximum() {
      return new Decimal(100);
    },
  });

  public stamina = new Container({
    default: 100,

    maximum() {
      return new Decimal(100);
    },
  });
}
