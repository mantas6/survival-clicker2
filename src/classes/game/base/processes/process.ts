import { Serializable } from '@/classes/game/base/serialization/serializable';

export enum ProcessType {
    Manual = 'manual',
    Auto = 'auto',
}

export abstract class Process extends Serializable {
  public static type: ProcessType = ProcessType.Manual;
  public 'constructor': typeof Process;

  public validate(): boolean {
    return true;
  }

  public run() {
    //
  }
}
