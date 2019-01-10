import { Action } from '@/classes/game/base/actions';

export class QueuedAction {
  readonly action: Action;

  constructor(action: Action) {
    this.action = action;
  }
}
