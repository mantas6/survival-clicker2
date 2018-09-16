/* tslint:disable:no-console */

import { Relay } from '@/classes/relay';
import { State } from '@/classes/game/state';
import Decimal from 'decimal.js';

const ctx: Worker = self as any;
const relay = new Relay(ctx);

const state = new State();

state.stats.finance.money.value = new Decimal(50);
console.log(state.stats.serialize('emit'))