import { SerializableWithReference } from '@/classes/game/base/serialization';
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

  get modifier() {
    return this.modifierFunc();
  }

  compute(opts: CalculationOptions): Decimal {
    return this.computeFunc(opts);
  }
}
