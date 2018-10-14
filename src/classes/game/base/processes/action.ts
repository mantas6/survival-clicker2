import { Process, ProcessType } from './process';
import { SerializeOn } from '@/classes/game/base/serialization';

export class Action extends Process {
  public static type: ProcessType = ProcessType.Manual;

  @SerializeOn('emit')
  get fullPath() {
    return this.path;
  }

  @SerializeOn('emit')
  get isAvailable() {
    return this.validate();
  }
}
