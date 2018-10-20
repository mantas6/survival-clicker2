import Decimal from 'decimal.js';
import { SerializeOn, Serializable, SerializeAs } from '@/classes/game/base/serialization';
import { LimitFlag } from '@/classes/game/base/stats';

interface MutableStat {
  mutate: (mutateFunc: MutationFunction) => void;
  probe: (mutateFunc: MutationFunction) => LimitFlag;
  path: string;
}

export type MutationFunction = (value: Decimal) => Decimal;
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
  protected mutationFunc: MutationFunction;

  constructor(statFunc: StatFunction<StatType>, mutationFunc: MutationFunction) {
    super();
    this.statFunc = statFunc;
    this.mutationFunc = mutationFunc;
  }

  calculate(opts: CalculationOptions) {
    const stat = this.statFunc();

    stat.mutate(this.mutationFunc);
  }

  validate(opts: ValidationOptions): boolean {
    const stat = this.statFunc();

    const probed = stat.probe(this.mutationFunc);

    if (opts.ignoreLimits) {
      if (opts.ignoreLimits.includes(probed)) {
        return true;
      }
    }

    return probed === true;
  }

  @SerializeOn('emit')
  get diff() {
    const value = new Decimal(0);
    return this.mutationFunc(value);
  }

  @SerializeOn('emit')
  get stat() {
    return this.statFunc().path;
  }
}
