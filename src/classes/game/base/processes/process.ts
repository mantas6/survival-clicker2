import Decimal from 'decimal.js';
import { Effect } from '@/classes/game/base/processes/effect';
import { Serializable } from '@/classes/game/base/serialization/serializable';

export enum ProcessType {
    Manual = 'manual',
    Auto = 'auto',
}

export abstract class Process extends Serializable {
  public static readonly type: ProcessType = ProcessType.Manual;
}
