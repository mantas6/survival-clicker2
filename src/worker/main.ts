import { Relay } from '@/classes/relay';
import { State } from '@/classes/game/state';
import { get } from 'lodash';
import { Calculable } from '@/classes/game/base/effects';
import { log, enableLogging } from '@/utils/log';
import { interval } from 'rxjs';
import { apply } from '@/utils/node';
import { Value, Container } from '@/classes/game/base/stats';

const ctx: Worker = self as any;
const relay = new Relay(ctx);

const state = new State();

emitAll();

relay.on('action', ({ path }) => {
  log('Calculating action of path', path);
  const action = get(state, path) as Calculable;
  if (action.validate()) {
    action.calculate();
    emitAll();
  }
});

relay.on('enableLogging', () => {
  enableLogging();
});

interval(1000).subscribe(() => {
  state.processes.calculate();
  applyLimitTriggers();
  emitAll();
});

function emitAll() {
  relay.emit('stats', state.stats.serialize('emit'));
  relay.emit('actions', state.actions.serialize('emit'));
  relay.emit('modifiers', state.modifiers.serialize('emit'));
}

function applyLimitTriggers() {
  apply<Value | Container>(state, node => {
    if (node instanceof Value) {
      node.triggerWhenMinimum();
    }

    if (node instanceof Container) {
      node.triggerWhenMaximum();
    }
  });
}
