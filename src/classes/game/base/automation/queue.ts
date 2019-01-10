import { QueuedAction } from './queued-action';
import { Action } from '@/classes/game/base/actions';

export class Queue {
  private items: QueuedAction[] = [];

  push(item: QueuedAction) {
    this.items.push(item);
  }

  find(action: Action) {
    return this.items.find(item => item.action.fullPath === action.fullPath);
  }
}
