import { Decimal } from 'decimal.js';
import { Value } from './value';

export abstract class Container extends Value {
  abstract get maximum(): Decimal;
}
