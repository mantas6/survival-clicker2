enum ProcessType {
    Manual = 'manual',
    Auto = 'auto',
}

interface ProcessOptions {
    type: ProcessType;
}

export abstract class Process {
  public readonly type: ProcessType;

  constructor(options: ProcessOptions) {
    this.type = options.type;
  }
}
