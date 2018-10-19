import { Value, Container } from '.';
import { State } from '@/classes/game/state';
import { apply } from '@/utils/node';

export function applyLimitTriggers(state: State) {
  apply<Value | Container>(state, node => {
    if (node instanceof Value) {
      node.triggerWhenMinimum();
    }

    if (node instanceof Container) {
      node.triggerWhenMaximum();
    }
  });
}
