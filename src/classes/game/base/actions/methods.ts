import { Action, ToggleAction } from '.';
import { State } from '@/classes/game/state';
import { traverse } from '@/utils/node';

export function applyUnlocked(state: State) {
  for (const node of traverse(state)) {
    if (node instanceof Action) {
      node.triggerUnlocked();
    }
  }
}

export function applyAutoToggled(state: State) {
  const multiplier = state.timeMultiplier;
  for (const node of traverse(state)) {
    if (node instanceof ToggleAction) {
      if (node.constructor.isAutoWhenToggled && node.isToggledOn) {
          if (node.validate({ multiplier })) {
            node.calculate({ multiplier });
          }
      }
    }
  }
}
