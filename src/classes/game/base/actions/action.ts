import { Process } from '@/classes/game/base/processes';
import { SerializeOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { TagName } from '@/classes/game/base/serialization/serializable';
import { Calculable, Mutation } from '@/classes/game/base/mutations';
import { log } from '@/utils/log';
import { Transform } from '@/classes/game/base/transformable';

export class Action extends Process {
  static unlockingMutations: string[] = [];
  'constructor': typeof Action;

  @SerializeOn('store')
  @Transform('reset', () => false)
  isUnlocked: boolean = false;

  @SerializeOn('emit')
  get fullPath() {
    return this.path;
  }

  @SerializeOn('emit')
  get isAvailable() {
    const multiplier = new Decimal(1);
    return this.validate({ multiplier });
  }

  @SerializeOn('emit')
  get maxMultiplier(): Decimal {
    let max = new Decimal(0);
    for (const { node } of this.children<Mutation<any>>(entry => entry instanceof Mutation)) {
      const { maxMultiplier } = node;
      if (maxMultiplier.isFinite() && maxMultiplier.greaterThan(max)) {
        max = node.maxMultiplier;
      }
    }

    return max;
  }

  serialize(tagName: TagName) {
    if (this.isUnlocked) {
      return super.serialize(tagName);
    }
  }

  triggerUnlocked() {
    if (!this.isUnlocked) {
      const { unlockingMutations } = this.constructor;
      if (unlockingMutations.length) {
        for (const name of this.constructor.unlockingMutations) {
          const mutation = (this as any)[name] as Calculable;

          const multiplier = new Decimal(1);

          if (mutation.validate({ multiplier })) {
            log('Unlocking action', this.path);
            this.isUnlocked = true;
          }
        }
      } else {
        this.isUnlocked = true;
      }
    }
  }
}
