import Decimal from 'decimal.js';
import { MutationFunction } from '@/classes/game/base/stats/value';

interface MutableStat {
  mutate: (mutateFunc: MutationFunction) => void;
}

type DiffFunction = () => Decimal;
type StatFunction<StatType> = () => StatType;

export interface Calculable {
  calculate: () => void;
}

export class Effect<StatType extends MutableStat> implements Calculable {
  protected statFunc: StatFunction<StatType>;
  protected diffFunc: DiffFunction;

  constructor(statFunc: StatFunction<StatType>, diffFunc: DiffFunction) {
    this.statFunc = statFunc;
    this.diffFunc = diffFunc;
  }

  public calculate() {
    const diff = this.diffFunc();
    const stat = this.statFunc();
    stat.mutate(value => value.add(diff));
  }
}
