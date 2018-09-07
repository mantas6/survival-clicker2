import { Decimal } from 'decimal.js';
import { Value } from '@/classes/game/base/stats/value';

export abstract class Container extends Value {
  abstract get maximum(): Decimal;
}
