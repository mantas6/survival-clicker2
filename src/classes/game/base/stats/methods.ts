import { Value, Container } from '.';
import { State } from '@/classes/game/state';
import { apply } from '@/utils/node';
import { Action } from '../actions';

export function applyReset(state: State) {
  apply<Value | Container | Action>(state, node => {
    // Need to setup decorators for global reset() functionality that will reset the actual storable variables
    if (node instanceof Value) {
      node.current = undefined;
    } else if (node instanceof Action) {
      node.isUnlocked = false;
    }
  });
}
