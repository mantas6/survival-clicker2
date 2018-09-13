import { Process, ProcessType } from './process';

export function Input(target: any, key: string) {
  target.prototype.inputs.push(key);
}

export function Output(target: any, key: string) {
  target.prototype.outputs.push(key);
}

export function Auto(target: any) {
  target.type = ProcessType.Auto;
}
