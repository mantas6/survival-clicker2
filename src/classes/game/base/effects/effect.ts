import Decimal from 'decimal.js';
import { MutationFunction } from '@/classes/game/base/stats/value';
import { SerializeOn, Serializable, SerializeAs } from '@/classes/game/base/serialization';
import { ProbeFlag } from '@/classes/game/base/stats';

interface MutableStat {
  mutate: (mutateFunc: MutationFunction) => void;
  probe: (mutateFunc: MutationFunction) => ProbeFlag;
  path: string;
}

type DiffFunction = () => Decimal;
type StatFunction<StatType> = () => StatType;

export interface Calculable {
  calculate: () => void;
  validate: () => boolean;
}

export class Effect<StatType extends MutableStat> extends Serializable implements Calculable {
  protected statFunc: StatFunction<StatType>;
  protected diffFunc: DiffFunction;

  constructor(statFunc: StatFunction<StatType>, diffFunc: DiffFunction) {
    super();
    this.statFunc = statFunc;
    this.diffFunc = diffFunc;
  }

  public calculate() {
    const diff = this.diffFunc();
    const stat = this.statFunc();

    stat.mutate(value => value.add(diff));
  }

  public validate(): boolean {
    const diff = this.diffFunc();
    const stat = this.statFunc();

    const probed = stat.probe(value => value.add(diff));

    return probed === true;
  }

  @SerializeOn('emit')
  get diff() {
    return this.diffFunc();
  }

  @SerializeOn('emit')
  get stat() {
    return this.statFunc().path;
  }
}
