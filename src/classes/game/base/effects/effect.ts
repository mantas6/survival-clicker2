import Decimal from 'decimal.js';
import { SerializeOn, Serializable, SerializeAs } from '@/classes/game/base/serialization';
import { LimitFlag } from '@/classes/game/base/stats';

interface MutableStat {
  mutate: (mutateFunc: MutationFunction) => void;
  probe: (mutateFunc: MutationFunction) => LimitFlag;
  value: Decimal;
  path: string;
}

export type MutationFunction = (value: Decimal) => Decimal;
export type DiffFunction = (opts: CalculationOptions) => Decimal;
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
    const stat = this.statFunc();
    const diff = this.diffFunc(opts);

    stat.mutate(value => value.add(diff));
  }

  validate(opts: ValidationOptions): boolean {
    const stat = this.statFunc();
    const diff = this.diffFunc(opts);

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
    const multiplier = new Decimal(1);
    const mutated = this.diffFunc({ multiplier });

    return mutated;
  }

  @SerializeOn('emit')
  get stat() {
    return this.statFunc().path;
  }
}
