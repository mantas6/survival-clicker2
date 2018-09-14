import { Relay } from '@/classes/relay';

const ctx: Worker = self as any;
const relay = new Relay(ctx);
