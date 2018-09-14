import Decimal from 'decimal.js';
import { Effect } from '@/classes/game/base/processes/effect';
import { StateNode } from '@/classes/game/base/state-node';

export enum ProcessType {
    Manual = 'manual',
    Auto = 'auto',
}

export abstract class Process extends StateNode {
  public static readonly type: ProcessType = ProcessType.Manual;
}
