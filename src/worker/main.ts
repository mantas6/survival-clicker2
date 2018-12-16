import { Relay } from '@/classes/relay';
import { State } from '@/classes/game/state';
import { get } from '@/utils/method';
import { Calculable } from '@/classes/game/base/mutations';
import { log, enableLogging } from '@/utils/log';
import { interval } from 'rxjs';
import { applyUnlocked } from '@/classes/game/base/actions/methods';
import Decimal from 'decimal.js';
import { apply } from '@/utils/node';
import { Transformable } from '@/classes/game/base/transformable';

const ctx: Worker = self as any;
const relay = new Relay(ctx);

const state = new State();

emitAll();

relay.on('action', ({ path, multiplier }) => {
  if (state.globals.isPaused) {
    return;
  }

  log('Calculating action of path', path);
  const action = get(state, path) as Calculable;
  if (action.validate({ multiplier: new Decimal(multiplier) })) {
    action.calculate({ multiplier: new Decimal(multiplier) });
    applyUnlocked(state);
    emitAll();
  }
});

relay.on('enableLogging', () => {
  enableLogging();
});

relay.on('reset', () => {
  applyReset();
  emitAll();
  emitStore();
});

relay.on('pause', () => {
  state.globals.isPaused = !state.globals.isPaused;
  emitAll();
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

  if (state.stats.character.health.value.isZero()) {
    applyReset();
  }

  applyClock();

  state.processes.calculate();
  state.timers.calculate();
  applyUnlocked(state);
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
  apply<Transformable>(state, node => {
    if (node instanceof Transformable) {
      node.transform('reset');
    }
  });
}

export function applyClock() {
  apply<Transformable>(state, node => {
    if (node instanceof Transformable) {
      node.transform('clock');
    }
  });
}
