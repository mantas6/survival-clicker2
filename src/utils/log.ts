// tslint:disable no-console

let isEnabled = false;

export function log(...message: any[]) {
  if (isEnabled) {
    console.log(...message);
  }
}

export function enableLogging() {
  isEnabled = true;
  log('Debugging mode is enabled');
}
