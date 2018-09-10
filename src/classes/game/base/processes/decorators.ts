export function Input(target: any, key: string) {
  target.prototype.inputs.push(key);
}

export function Output(target: any, key: string) {
  target.prototype.outputs.push(key);
}
