import { Process, ProcessType } from './process';

export class Action extends Process {
  public static type: ProcessType = ProcessType.Manual;
}
