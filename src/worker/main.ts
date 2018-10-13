import { Relay } from '@/classes/relay';
import { State } from '@/classes/game/state';
import { get } from 'lodash';
import { Calculable } from '@/classes/game/base/effects';
import { log, enableLogging } from '@/utils/log';
import { interval } from 'rxjs';

const ctx: Worker = self as any;
const relay = new Relay(ctx);

const state = new State();

relay.emit('stats', state.stats.serialize('emit'));
relay.emit('actions', state.actions.serialize('emit'));

relay.on('action', ({ path }) => {
  log('Calculating action of path', path);
  const action = get(state, path) as Calculable;
  action.calculate();
  relay.emit('stats', state.stats.serialize('emit'));
});

relay.on('enableLogging', () => {
  enableLogging();
});

interval(1000).subscribe(() => {
  state.processes.calculate();
  relay.emit('stats', state.stats.serialize('emit'));
});
