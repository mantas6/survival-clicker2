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

export function applyQueued(state: State) {
  const multiplier = state.timeMultiplier;

  for (const node of traverse(state)) {
    if (node instanceof Action) {
      if (node.queued && node.queued.shouldCalculate({ multiplier })) {
        node.calculate({ multiplier });
      }
    }
  }
}