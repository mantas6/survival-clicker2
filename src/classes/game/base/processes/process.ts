import Decimal from 'decimal.js';
import { Effect } from '@/classes/game/base/processes/effect';

export enum ProcessType {
    Manual = 'manual',
    Auto = 'auto',
}

export abstract class Process {
  public static readonly type: ProcessType = ProcessType.Manual;
}
