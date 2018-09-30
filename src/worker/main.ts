import { Relay } from '@/classes/relay';
import { State } from '@/classes/game/state';
import Decimal from 'decimal.js';

const ctx: Worker = self as any;
const relay = new Relay(ctx);

const state = new State();

const mySave = JSON.parse('{"character":{"health":{}},"finance":{"money":{"current":"150"}}}');

state.stats.unserialize(mySave);

relay.emit('stats', state.stats.serialize('emit'));
relay.emit('processes', state.processes.serialize('emit'));
