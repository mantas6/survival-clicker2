import { Action } from '.';
import { State } from '@/classes/game/state';
import { apply } from '@/utils/node';

export function applyUnlocked(state: State) {
  apply<Action>(state, node => {
    if (node instanceof Action) {
      node.triggerUnlocked();
    }
  });
}
