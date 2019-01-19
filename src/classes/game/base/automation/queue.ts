import { QueuedAction } from './queued-action';
import { Action } from '@/classes/game/base/actions';
import { TagName, SerializedNode } from '@/classes/game/base/serialization/serializable';
import { get } from '@/utils/method';
import { SerializableWithReference } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

interface SerializedQueuedAction {
  action: { fullPath: string };
  interval: string;
}

export class Queue extends SerializableWithReference {
  private items: QueuedAction[] = [];

  push(item: QueuedAction) {
    this.items.push(item);
  }

  find(action: Action) {
    return this.items.find(item => item.action.fullPath === action.fullPath);
  }

  serialize(tagName: TagName): SerializedNode | undefined {
    const serialized: SerializedNode = {};

    for (const [ index, item ] of this.items.entries()) {
      serialized[index] = item.serialize(tagName);
    }

    return serialized;
  }

  unserialize(serialized: SerializedNode) {
    for (const serializedItem of Object.values<SerializedQueuedAction>(serialized as any)) {
      const action = get(this.state, serializedItem.action.fullPath) as Action;

      this.push(new QueuedAction(action, { interval: new Decimal(serializedItem.interval) }));
    }
  }

  calculate() {
    const multiplier = this.state.timeMultiplier;

    for (const item of this.items) {
      item.calculate({ multiplier });
    }
  }
}
