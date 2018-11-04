import { Process } from '@/classes/game/base/processes';
import { SerializeOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { TagName } from '@/classes/game/base/serialization/serializable';
import { Calculable, Mutation } from '@/classes/game/base/mutations';
import { log } from '@/utils/log';

export class Action extends Process {
  static unlockingEffects: string[] = [];
  'constructor': typeof Action;

  @SerializeOn('store')
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
      const { unlockingEffects } = this.constructor;
      if (unlockingEffects.length) {
        for (const name of this.constructor.unlockingEffects) {
          const effect = (this as any)[name] as Calculable;

          const multiplier = new Decimal(1);

          if (effect.validate({ multiplier })) {
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
