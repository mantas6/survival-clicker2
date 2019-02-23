import { Relay } from '@/classes/relay';
import { State } from '@/classes/game/state';
import { get } from '@/utils/method';
import { log, enableLogging } from '@/utils/log';
import { interval } from 'rxjs';
import { applyUnlocked } from '@/classes/game/base/actions/methods';
import { applyQueued } from '@/classes/game/base/automation/methods';
import Decimal from 'decimal.js';
import { traverse } from '@/utils/node';
import { Transformable, applyReset } from '@/classes/game/base/transformable';
import { Action, ToggleAction } from '@/classes/game/base/actions';
import { Queued } from '@/classes/game/base/automation';

const ctx: Worker = self as any;
const relay = new Relay(ctx);

const state = new State();

runClock();
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

    // Toggle on item right after purchase
    if (action instanceof ToggleAction) {
      if (!action.isToggledOn && action.canToggleOn) {
        action.toggleOn();
      }
    }

    emitAll();
  }
});

relay.on('toggle', ({ path }) => {
  const action = get(state, path) as ToggleAction;
  if (!action.isToggledOn && action.canToggleOn) {
    action.toggleOn();
  } else if (action.isToggledOn && action.canToggleOff) {
    action.toggleOff();
  }

  emitAll();
});

relay.on('auto', ({ path, every }) => {
  const action = get(state, path) as Action;

  if (!every) {
    action.queued = undefined;
  } else {
    if (action.queued) {
      action.queued.interval = new Decimal(every);
    } else {
      action.queued = new Queued({ interval: new Decimal(every) });
    }
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
  applyReset(state);
  state.unserialize(serializedState);
  emitAll();
});

interval(30e3).subscribe(() => {
  emitStore();
});

interval(1000).subscribe(() => {
  runClock();
  emitAll();
});

function runClock() {
  if (state.globals.isPaused) {
    return;
  }

  if (!state.globals.alive.value) {
    return;
  }

  applyClock();

  state.processes.calculate();
  state.timers.calculate();
  applyUnlocked(state);
  applyQueued(state);
}

function emitAll() {
  relay.emit('state', state.serialize('emit'));
}

function emitStore() {
  const serializedState = state.serialize('store');
  relay.emit('save', serializedState);
}

function applyClock() {
  for (const node of traverse(state)) {
    if (node instanceof Transformable) {
      node.transform('clock');
    }
  }
}
