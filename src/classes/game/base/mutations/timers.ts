import Decimal from 'decimal.js';
import { SerializableWithReference } from '@/classes/game/base/serialization';
import { Timer } from './timer';
import { Effect } from '@/classes/game/base/modifiers';

export class Timers extends SerializableWithReference {
  protected items: Timer[] = [];

  push(effect: Effect, durationFunc: () => Decimal) {
    this.items.push(new Timer(effect, durationFunc));
  }

  calculate() {
    const multiplier = this.state.timeMultiplier;

    for (const item of this.items) {
      item.calculate({ multiplier });
    }

    this.items = this.items.filter(item => !item.hasTimedOut());
  }

  *[Symbol.iterator](): IterableIterator<Timer> {
    for (const item of this.items) {
      yield item;
    }
  }
}
