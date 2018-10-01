import Decimal from 'decimal.js';
import { MutationFunction } from '@/classes/game/base/stats/value';
import { Tag, Serializable, SerializeAs } from '@/classes/game/base/serialization';

interface MutableStat {
  mutate: (mutateFunc: MutationFunction) => void;
  path: string;
}

type DiffFunction = () => Decimal;
type StatFunction<StatType> = () => StatType;

export interface Calculable {
  calculate: () => void;
}

export class Effect<StatType extends MutableStat> extends Serializable implements Calculable {
  protected statFunc: StatFunction<StatType>;
  protected diffFunc: DiffFunction;

  constructor(statFunc: StatFunction<StatType>, diffFunc: DiffFunction) {
    super();
    this.statFunc = statFunc;
    this.diffFunc = diffFunc;
  }

  // Rename this method to run?
  public calculate() {
    const diff = this.diffFunc();
    const stat = this.statFunc();
    stat.mutate(value => value.add(diff));
  }

  @Tag('emit')
  get diff() {
    return this.diffFunc();
  }

  @Tag('emit')
  get stat() {
    return this.statFunc().path;
  }
}
