import { SerializableWithReference } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { Modifier } from '.';

type ComputeFunction = () => Decimal;

export class Effect extends SerializableWithReference {
  protected computeFunc: () => Decimal;
  protected modifierFunc: () => Modifier;

  constructor(modifierFunc: () => Modifier, computeFunc: ComputeFunction) {
    super();
    this.computeFunc = computeFunc;
    this.modifierFunc = modifierFunc;
  }

  get modifier() {
    return this.modifierFunc();
  }

  get value() {
    return this.computeFunc();
  }
}
