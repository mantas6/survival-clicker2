// tslint:disable no-console

let isEnabled = false;

export function log(...data: any[]) {
  if (isEnabled) {
    console.log(...data);
  }
}

export function enableLogging() {
  isEnabled = true;
}
