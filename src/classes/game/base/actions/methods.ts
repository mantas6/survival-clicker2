import { Action } from '.';
import { State } from '@/classes/game/state';
import { traverse } from '@/utils/node';

export function applyUnlocked(state: State) {
  for (const node of traverse(state)) {
    if (node instanceof Action) {
      node.triggerUnlocked();
    }
  }
}
