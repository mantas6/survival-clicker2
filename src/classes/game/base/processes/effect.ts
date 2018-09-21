import Decimal from 'decimal.js';
import { MutationFunction } from '@/classes/game/base/stats/value';

interface MutableStat {
  mutate: (mutateFunc: MutationFunction) => void;
}

type DiffFunction = () => Decimal;

export class Effect<StatType extends MutableStat> {
  public stat: StatType;
  private diffFunc: DiffFunction;

  constructor(stat: StatType, diffFunc: DiffFunction) {
    this.stat = stat;
    this.diffFunc = diffFunc;
  }

  public calculate() {
    const diff = this.diffFunc();
    this.stat.mutate(value => value.add(diff));
  }
}
