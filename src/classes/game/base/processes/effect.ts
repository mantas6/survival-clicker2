import { Value, Container } from '@/classes/game/base/stats';
import Decimal from 'decimal.js';

type Stat = Value | Container;
type DiffFunction = () => void;

export class Effect {
  public stat: Stat;
  private diffFunction: DiffFunction;

  constructor(stat: Stat, diffFunction: DiffFunction) {
    this.stat = stat;
    this.diffFunction = diffFunction;
  }
}
