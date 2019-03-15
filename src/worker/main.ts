import { Relay } from '@/classes/relay';
import { State } from '@/classes/game/state';
import { log, enableLogging } from '@/utils/log';
import { interval } from 'rxjs';
import Decimal from 'decimal.js';
import { traverse } from '@/utils/node';
import { applyReset } from '@/classes/game/base/transformable';
import { Action, ToggleAction } from '@/classes/game/base/actions';
import { Queued } from '@/classes/game/base/automation';
import { Favorite } from '@/classes/game/base/actions/favorite';

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
  const action = state.get<Action>(path)!;

  if (action.validate({ multiplier: new Decimal(multiplier) })) {
    action.calculate({ multiplier: new Decimal(multiplier) });
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
  const action = state.get<ToggleAction>(path)!;

  if (!action.isToggledOn && action.canToggleOn) {
    action.toggleOn();
  } else if (action.isToggledOn && action.canToggleOff) {
    action.toggleOff();
  }

  emitAll();
});

relay.on('auto', ({ path, every }) => {
  const action = state.get<Action>(path)!;

  const favorite = action.favorite;

  if (favorite) {
    if (!every) {
      favorite.queued = undefined;
    } else {
      if (favorite.queued) {
        favorite.queued.interval = new Decimal(every);
      } else {
        favorite.queued = new Queued({ interval: new Decimal(every) });
      }
    }

    emitAll();
  }
});

relay.on('addFavorite', ({ path }) => {
  const action = state.get<Action>(path)!;

  action.favorite = new Favorite();
  emitAll();
});

relay.on('removeFavorite', ({ path }) => {
  const action = state.get<Action>(path)!;

  action.favorite = undefined;
  emitAll();
});

relay.on('enableLogging', () => {
  enableLogging();
});

relay.on('seen', ({ path }) => {
  const action = state.get<Action>(path)!;

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
    node.onClock();
  }
}
