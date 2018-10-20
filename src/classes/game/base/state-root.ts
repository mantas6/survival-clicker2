import Decimal from 'decimal.js';
import { Serializable } from './serialization';

export class StateRoot extends Serializable {
  timeMultiplier = new Decimal(1);
}
