import { Value, Container } from '@/classes/game/base/stats';
import Decimal from 'decimal.js';

type Stat = Value | Container;
type DiffFunction = () => Decimal;

export class Effect<StatType> {
  public stat: StatType;
  private diffFunction: DiffFunction;

  constructor(stat: StatType, diffFunction: DiffFunction) {
    this.stat = stat;
    this.diffFunction = diffFunction;
  }

  public calculate(): Decimal {
    return this.diffFunction();
  }
}
