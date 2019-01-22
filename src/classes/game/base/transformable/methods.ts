import { traverse } from '@/utils/node';
import { State } from '@/classes/game/state';
import { Transformable } from './transformable';

export function applyReset(state: State) {
  for (const node of traverse(state)) {
    if (node instanceof Transformable) {
      node.transform('reset');
    }
  }
}
