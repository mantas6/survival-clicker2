import { Value, Container } from '.';
import { State } from '@/classes/game/state';
import { apply } from '@/utils/node';

export function applyReset(state: State) {
  apply<Value | Container>(state, node => {
    if (node instanceof Value) {
      node.current = undefined;
    }
  });
}
