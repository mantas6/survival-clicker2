import { Decimal } from 'decimal.js';
import { UnserializeAs, SerializeOn } from '@/classes/game/base/serialization';
import { LimitFlag } from '.';
import { MutationFunction } from '@/classes/game/base/mutations';
import { Transformable, Transform } from '@/classes/game/base/transformable';

export abstract class Value extends Transformable {
  abstract default: number | string;
  /**
   * Standard value stat 99% of the time will default to zero as minimum value
   */
  minimum: number | string = 0;

  @SerializeOn('store')
  @UnserializeAs(input => new Decimal(input.toString()))
  @Transform('reset', () => undefined)
  current?: Decimal;

  @SerializeOn('emit')
  @Transform('reset', () => new Decimal(0))
  @Transform('clock', () => new Decimal(0))
  rate = new Decimal(0);

  @SerializeOn('emit')
  get value(): Decimal {
    if (this.current === undefined) {
      return new Decimal(this.default);
    }

    return this.current;
  }

  mutate(mutateFunc: MutationFunction) {
    const mutated = mutateFunc(this.value);

    this.rate = this.rate.add(mutated.sub(this.value));

    const flag = this.probe(mutateFunc);

    if (flag === 'lessThanMinimum') {
      this.current = new Decimal(this.minimum);

      this.onLessThanMinimum();
    } else {
      this.current = mutated;
    }
  }

  probe(mutateFunc: MutationFunction): LimitFlag {
    const mutated = mutateFunc(this.value);

    if (mutated.lessThan(this.minimum)) {
      return 'lessThanMinimum';
    }

    return true;
  }

  getMaxMultiplier(diff: Decimal): Decimal {
    if (diff.isNeg()) {
      return this.value.minus(this.minimum).div(diff.negated());
    } else {
      return new Decimal(Infinity);
    }
  }

  /**
   * Is triggered when value floors to the minimum after mutation
   */
  protected onLessThanMinimum(): void {
    //
  }
}
