import { ProcessType, Process } from './process';

export function Auto(processClass: Process) {
  processClass.constructor.type = ProcessType.Auto;
}
