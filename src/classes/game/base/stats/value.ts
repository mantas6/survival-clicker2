import { Decimal } from 'decimal.js';
import { Serializable, SerializeAs, UnserializeAs, Tag } from '@/classes/game/base/serialization';

export type MutationFunction = (value: Decimal) => Decimal;

export abstract class Value extends Serializable {
  public abstract default: number | string;
  /**
   * Standard value stat 99% of the time will default to zero as minimum value
   */
  public minimum: number | string = 0;

  @Tag('emit')
  @SerializeAs((value: Decimal) => value.toString())
  @UnserializeAs(input => new Decimal(input))
  protected current?: Decimal;

  get value(): Decimal {
    if (this.current === undefined) {
      this.current = new Decimal(this.default);
    }

    return this.current;
  }

  set value(value: Decimal) {
    this.current = value;
  }

  public mutate(mutateFunc: MutationFunction) {
    const mutated = mutateFunc(this.value);

    if (mutated.lessThan(this.minimum)) {
      this.current = new Decimal(this.minimum);
    } else {
      this.current = mutated;
    }
  }
}
