import { Process } from '@/classes/game/base/processes';
import { SerializeOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { TagName } from '@/classes/game/base/serialization/serializable';
import { Calculable } from '@/classes/game/base/effects';
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
