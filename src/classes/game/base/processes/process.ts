import Decimal from 'decimal.js';
import { Effect } from '@/classes/game/base/processes/effect';

enum ProcessType {
    Manual = 'manual',
    Auto = 'auto',
}

export abstract class Process {
  public abstract readonly type: ProcessType;
}
