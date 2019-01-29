import Decimal from 'decimal.js';
import { SerializeOn, Serializable } from '@/classes/game/base/serialization';
import { LimitFlag } from '@/classes/game/base/stats';

interface MutableStat {
  mutate: (mutateFunc: MutationFunction) => void;
  probe: (mutateFunc: MutationFunction) => LimitFlag;
  getMaxMultiplier: (diff: Decimal) => Decimal;
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

export class Mutation<StatType extends MutableStat> extends Serializable implements Calculable {
  protected statFunc: StatFunction<StatType>;
  protected diffFunc: DiffFunction;
  protected maxFunc?: () => Decimal;

  constructor(statFunc: StatFunction<StatType>, diffFunc: DiffFunction, maxFunc?: () => Decimal) {
    super();
    this.statFunc = statFunc;
    this.diffFunc = diffFunc;
    this.maxFunc = maxFunc;
  }

  calculate(opts: CalculationOptions) {
    const stat = this.statFunc();
    const diff = this.diffFunc(opts).times(opts.multiplier);

    stat.mutate(value => value.add(diff));
  }

  validate(opts: ValidationOptions): boolean {
    const stat = this.statFunc();
    const diff = this.diffFunc(opts).times(opts.multiplier);

    const probed = stat.probe(value => value.add(diff));

    if (opts.ignoreLimits) {
      if (opts.ignoreLimits.includes(probed)) {
        return true;
      }
    }

    return probed === true;
  }

  @SerializeOn('emit')
  get isAvailable(): boolean {
    const multiplier = new Decimal(1);
    return this.validate({ multiplier });
  }

  @SerializeOn('emit')
  get diff() {
    const multiplier = new Decimal(1);
    const mutated = this.diffFunc({ multiplier });

    return mutated;
  }

  @SerializeOn('emit')
  get diffMax() {
    const multiplier = this.maxMultiplier;
    const mutated = this.diffFunc({ multiplier });

    return mutated;
  }

  @SerializeOn('emit')
  get stat() {
    return this.statFunc().path;
  }

  @SerializeOn('emit')
  get maxMultiplier(): Decimal {
    if (this.maxFunc) {
      return this.maxFunc();
    } else {
      const multiplier = new Decimal(1);
      const diff = this.diffFunc({ multiplier });
      return this.statFunc().getMaxMultiplier(diff).floor();
    }
  }
}
