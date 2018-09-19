import { Decimal } from 'decimal.js';
import { Serializable, SerializeAs, UnserializeAs, Tag } from '@/classes/game/base/serialization';

export type MutationFunction = (value: Decimal) => Decimal;

export abstract class Value extends Serializable {
  public abstract default: number | string;

  @Tag('emit')
  @SerializeAs((value: Decimal) => value.toString())
  @UnserializeAs(input => new Decimal(input))
  private current?: Decimal;

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
    this.current = mutateFunc(this.value);
  }
}
