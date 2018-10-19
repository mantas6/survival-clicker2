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

export interface ValidationOptions {
  ignoreLimits?: ProbeFlag[];
}

export interface Calculable {
  calculate: () => void;
  validate: (options?: ValidationOptions) => boolean;
}

export class Effect<StatType extends MutableStat> extends Serializable implements Calculable {
  protected statFunc: StatFunction<StatType>;
  protected diffFunc: DiffFunction;

  constructor(statFunc: StatFunction<StatType>, diffFunc: DiffFunction) {
    super();
    this.statFunc = statFunc;
    this.diffFunc = diffFunc;
  }

  calculate() {
    const diff = this.diffFunc();
    const stat = this.statFunc();

    stat.mutate(value => value.add(diff));
  }

  validate(opts?: ValidationOptions): boolean {
    const diff = this.diffFunc();
    const stat = this.statFunc();

    const probed = stat.probe(value => value.add(diff));

    if (opts && opts.ignoreLimits) {
      if (opts.ignoreLimits.includes(probed)) {
        return true;
      }
    }

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
