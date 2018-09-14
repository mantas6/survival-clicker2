import { Relay } from '@/classes/relay';
import { State } from '@/classes/game/state';

const ctx: Worker = self as any;
const relay = new Relay(ctx);

const state = new State();
