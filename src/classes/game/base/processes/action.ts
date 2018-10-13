import { Process, ProcessType } from './process';
import { SerializeOn } from '@/classes/game/base/serialization';

export class Action extends Process {
  public static type: ProcessType = ProcessType.Manual;

  @SerializeOn('emit')
  get actionName() {
    return this.path;
  }
}
