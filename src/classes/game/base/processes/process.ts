import { Serializable } from '@/classes/game/base/serialization/serializable';
import { Calculable } from '@/classes/game/base/processes/effect';

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
    for (const effect of this.effects()) {
      effect.calculate();
    }
  }

  public *effects(): IterableIterator<Calculable> {
    for (const propertyName of Object.getOwnPropertyNames(this)) {
      yield (this as any)[propertyName];
    }
  }
}
