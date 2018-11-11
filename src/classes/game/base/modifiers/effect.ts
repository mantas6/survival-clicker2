import { SerializableWithReference, SerializeOn, SerializeAs } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { Modifier } from '.';
import { CalculationOptions } from '../mutations';

type ComputeFunction = () => Decimal;

export class Effect extends SerializableWithReference {
  protected computeFunc: (opts: CalculationOptions) => Decimal;
  protected modifierFunc: () => Modifier;

  constructor(modifierFunc: () => Modifier, computeFunc: ComputeFunction) {
    super();
    this.computeFunc = computeFunc;
    this.modifierFunc = modifierFunc;
  }

  @SerializeOn('emit', 'store')
  get fullPath() {
    return this.path;
  }

  @SerializeOn('emit')
  @SerializeAs<Modifier>(input => input.path)
  get modifier() {
    return this.modifierFunc();
  }

  @SerializeOn('emit')
  get value() {
    const multiplier = new Decimal(1);
    return this.compute({ multiplier });
  }

  compute(opts: CalculationOptions): Decimal {
    return this.computeFunc(opts);
  }
}
