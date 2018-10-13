import { Relay } from '@/classes/relay';

let relay: Relay;

export function setRelay(createdRelay: Relay) {
  relay = createdRelay;
}

export function getRelay() {
  return relay;
}
