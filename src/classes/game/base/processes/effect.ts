import { Value, Container } from '@/classes/game/base/stats';
import Decimal from 'decimal.js';
import { MutationFunction } from '@/classes/game/base/stats/value';

interface MutableStat {
  mutate: (mutateFunc: MutationFunction) => void;
}

type DiffFunction = () => Decimal;

export class Effect<StatType extends MutableStat> {
  public stat: StatType;
  private diffFunction: DiffFunction;

  constructor(stat: StatType, diffFunction: DiffFunction) {
    this.stat = stat;
    this.diffFunction = diffFunction;
  }

  public calculate() {
    const diff = this.diffFunction();
    this.stat.mutate(value => value.add(diff));
  }
}
