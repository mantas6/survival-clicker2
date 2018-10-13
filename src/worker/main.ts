import { Relay } from '@/classes/relay';
import { State } from '@/classes/game/state';
import { get } from 'lodash';
import { Calculable } from '@/classes/game/base/effects';
import { log } from '@/utils/log';

const ctx: Worker = self as any;
const relay = new Relay(ctx);

const state = new State();

relay.emit('stats', state.stats.serialize('emit'));
relay.emit('actions', state.actions.serialize('emit'));

relay.on('action', ({ path }) => {
  const action = get(state, path) as Calculable;
  action.calculate();
});
