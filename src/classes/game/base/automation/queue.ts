import { Item } from './item';

export class Queue {
  items: Item[] = [];

  push(item: Item) {
    this.items.push(item);
  }
}
