import Decimal from 'decimal.js';
import { Timer, TimerOptions } from './timer';
import { Effect } from '@/classes/game/base/modifiers';
import { TagName, SerializedNode } from '@/classes/game/base/serialization/serializable';
import { Transform, Transformable } from '../transformable';
import { get } from 'lodash';

interface SerializedTimer {
  effect: { fullPath: string };
  duration: string;
  multiplier: string;
  timePassed: string;
}

export class Timers extends Transformable {
  @Transform('reset', () => [])
  protected items: Timer[] = [];

  push(opts: TimerOptions) {
    this.items.push(new Timer(opts));
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
    for (const serializedItem of Object.values<SerializedTimer>(serialized as any)) {
      const effect = get(this.state, serializedItem.effect.fullPath) as Effect;
      const duration = new Decimal(serializedItem.duration);
      const timePassed = new Decimal(serializedItem.timePassed);
      const multiplier = new Decimal(serializedItem.multiplier);

      this.push({ effect, duration, timePassed, multiplier });
    }
  }

  *[Symbol.iterator](): IterableIterator<Timer> {
    for (const item of this.items) {
      yield item;
    }
  }
}
