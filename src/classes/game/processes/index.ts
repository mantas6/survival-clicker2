import Decimal from 'decimal.js';

enum ProcessType {
    Manual = 'manual',
    Auto = 'auto',
}

interface ProcessEffect {
  stat: any;
  diff: Decimal;
}

export abstract class Process {
  public abstract readonly type: ProcessType;

  public abstract readonly input: ProcessEffect;
  public abstract readonly output: ProcessEffect;
}
