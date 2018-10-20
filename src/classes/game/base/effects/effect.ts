import Decimal from 'decimal.js';
import { SerializeOn, Serializable, SerializeAs } from '@/classes/game/base/serialization';
import { LimitFlag } from '@/classes/game/base/stats';

interface MutableStat {
  mutate: (mutateFunc: MutationFunction) => void;
  probe: (mutateFunc: MutationFunction) => LimitFlag;
  path: string;
}

export type MutationFunction = (value: Decimal) => Decimal;
type DiffFunction = () => Decimal;
type StatFunction<StatType> = () => StatType;

export interface CalculationOptions {
  multiplier: Decimal;
}

export interface ValidationOptions extends CalculationOptions {
  ignoreLimits?: LimitFlag[];
}

export interface Calculable {
  calculate: (opts: CalculationOptions) => void;
  validate: (opts: ValidationOptions) => boolean;
}

export class Effect<StatType extends MutableStat> extends Serializable implements Calculable {
  protected statFunc: StatFunction<StatType>;
  protected diffFunc: DiffFunction;

  constructor(statFunc: StatFunction<StatType>, diffFunc: DiffFunction) {
    super();
    this.statFunc = statFunc;
    this.diffFunc = diffFunc;
  }

  calculate(opts: CalculationOptions) {
    const diff = this.diffFunc();
    const stat = this.statFunc();

    stat.mutate(value => value.add(diff.times(opts.multiplier)));
  }

  validate(opts: ValidationOptions): boolean {
    const diff = this.diffFunc();
    const stat = this.statFunc();

    const probed = stat.probe(value => value.add(diff));

    if (opts.ignoreLimits) {
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
