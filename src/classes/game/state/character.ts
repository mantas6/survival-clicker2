import { Stat, Container } from '@/classes/game/base/stat';
import Decimal from 'decimal.js';

export class Character {
  public health = new Container({
    defaultValue: 100,

    maximumFunction() {
      return new Decimal(100);
    },
  });

  public stamina = new Container({
    defaultValue: 100,

    maximumFunction() {
      return new Decimal(100);
    },
  });
}
