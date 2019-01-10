import { Action } from '@/classes/game/base/actions';

export class Item {
  private action: Action;

  constructor(action: Action) {
    this.action = action;
  }
}