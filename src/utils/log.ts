// tslint:disable no-console

let isEnabled = false;

export function log(...data: any[]) {
  if (isEnabled) {
    const message = format_message(data);

    console.log(...message);
  }
}

function format_message(data: any[]) {
  const error = new Error();

  let name = '';

  if (error.stack) {
    const stack = error.stack.split('\n')
      .map(line => line.trim());

    name = stack[3];
  }

  return [ name, ...data ];
}

export function enableLogging() {
  isEnabled = true;
  log('Debugging mode is enabled');
}
