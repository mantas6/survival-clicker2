import { SerializableWithReference, SerializeOn, SerializeAs } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { Modifier } from '.';
import { CalculationOptions } from '../mutations';

type ComputeFunction = (opts: CalculationOptions) => Decimal;

interface EffectOptions {
  modifier: () => Modifier;
  value: ComputeFunction;
  duration: () => Decimal.Value;
}

export class Effect extends SerializableWithReference {
  protected computeFunc: ComputeFunction;
  protected modifierFunc: () => Modifier;

  constructor(opts: EffectOptions) {
    super();
    this.computeFunc = opts.value;
    this.modifierFunc = opts.modifier;
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
    return this.computeFunc(opts).mul(opts.multiplier);
  }
}
