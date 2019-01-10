import { QueuedAction } from './queued-action';

export class Queue {
  items: QueuedAction[] = [];

  push(item: QueuedAction) {
    this.items.push(item);
  }
}
