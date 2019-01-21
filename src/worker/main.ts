import { Relay } from '@/classes/relay';
import { State } from '@/classes/game/state';
import { get } from '@/utils/method';
import { log, enableLogging } from '@/utils/log';
import { interval } from 'rxjs';
import { applyUnlocked, applyQueued } from '@/classes/game/base/actions/methods';
import Decimal from 'decimal.js';
import { traverse } from '@/utils/node';
import { Transformable } from '@/classes/game/base/transformable';
import { Action } from '@/classes/game/base/actions';
import { Queued } from '@/classes/game/base/automation';

const ctx: Worker = self as any;
const relay = new Relay(ctx);

const state = new State();

emitAll();

relay.on('action', ({ path, multiplier }) => {
  if (state.globals.isPaused) {
    return;
  }

  log('Calculating action of path', path);
  const action = get(state, path) as Action;
  if (action.validate({ multiplier: new Decimal(multiplier) })) {
    action.calculate({ multiplier: new Decimal(multiplier) });
    applyUnlocked(state);
    emitAll();
  }
});

relay.on('auto', ({ path }) => {
  const action = get(state, path) as Action;

  if (action.queued) {
    action.queued = undefined;
  } else {
    action.queued = new Queued({ interval: new Decimal(1) });
  }

  emitAll();
});

relay.on('enableLogging', () => {
  enableLogging();
});

relay.on('seen', ({ path }) => {
  const action = get(state, path) as Action;
  action.isSeen = true;
  emitAll();
});

relay.on('pause', () => {
  state.globals.isPaused = !state.globals.isPaused;
  emitAll();
});

relay.on('save', () => {
  emitStore();
});

relay.on('load', serializedState => {
  applyReset();
  state.unserialize(serializedState);
  emitAll();
});

interval(30e3).subscribe(() => {
  emitStore();
});

interval(1000).subscribe(() => {
  if (state.globals.isPaused) {
    return;
  }

  if (!state.globals.isAlive) {
    return;
  }

  applyClock();

  state.processes.calculate();
  state.timers.calculate();
  applyUnlocked(state);
  applyQueued(state);
  emitAll();
});

function emitAll() {
  relay.emit('state', state.serialize('emit'));
}

function emitStore() {
  const serializedState = state.serialize('store');
  relay.emit('save', serializedState);
}

export function applyReset() {
  for (const node of traverse(state)) {
    if (node instanceof Transformable) {
      node.transform('reset');
    }
  }
}

export function applyClock() {
  for (const node of traverse(state)) {
    if (node instanceof Transformable) {
      node.transform('clock');
    }
  }
}
