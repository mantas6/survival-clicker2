import { Stat, Container } from '@/classes/game/stat';
import Decimal from 'decimal.js';

export class Character {
  public health = new Container(100, () => {
    return new Decimal(100);
  });

  public stamina = new Container(100, () => {
    return new Decimal(100);
  });
}