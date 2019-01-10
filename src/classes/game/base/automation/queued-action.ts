import { Action } from '@/classes/game/base/actions';

export class QueuedAction {
  private action: Action;

  constructor(action: Action) {
    this.action = action;
  }
}
