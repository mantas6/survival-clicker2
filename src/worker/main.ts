import { Relay } from '@/classes/relay';
import { State } from '@/classes/game/state';
import Decimal from 'decimal.js';

const ctx: Worker = self as any;
const relay = new Relay(ctx);

const state = new State();

relay.emit('stats', state.stats.serialize('emit'));
relay.emit('actions', state.actions.serialize('emit'));
