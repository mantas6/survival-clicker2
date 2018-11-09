import Decimal from 'decimal.js';
import { Timer } from './timer';
import { Effect } from '@/classes/game/base/modifiers';
import { TagName, SerializedNode } from '@/classes/game/base/serialization/serializable';
import { Transform, Transformable } from '../transformable';
import { get } from 'lodash';

interface SerializedTimer {
  effect: string;
  duration: string;
  timePassed: string;
}

export class Timers extends Transformable {
  @Transform('reset', () => [])
  protected items: Timer[] = [];

  push(effect: Effect, duration: Decimal, timePassed?: Decimal) {
    this.items.push(new Timer(effect, duration, timePassed));
  }

  calculate() {
    const multiplier = this.state.timeMultiplier;

    for (const item of this.items) {
      item.calculate({ multiplier });
    }

    this.items = this.items.filter(item => !item.hasTimedOut());
  }

  serialize(tagName: TagName): SerializedNode | undefined {
    const serialized: SerializedNode = {};

    for (const [ index, item ] of this.items.entries()) {
      serialized[index] = item.serialize(tagName);
    }

    return serialized;
  }

  unserialize(serialized: SerializedNode) {
    // Fix type-checking
    for (const serializedItem of Object.values(serialized) as any) {
      const effect = get(this.state, serializedItem.effect) as Effect;
      this.push(effect, new Decimal(serializedItem.duration), new Decimal(serializedItem.timePassed));
    }
  }

  *[Symbol.iterator](): IterableIterator<Timer> {
    for (const item of this.items) {
      yield item;
    }
  }
}
