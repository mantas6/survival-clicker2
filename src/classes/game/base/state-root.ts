import { StateNode } from './state-node';
import Decimal from 'decimal.js';

export class StateRoot extends StateNode {
  timeMultiplier = new Decimal(1);
}
