import { Process } from './process';
import { SerializeOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

export class Action extends Process {
  @SerializeOn('emit')
  get fullPath() {
    return this.path;
  }

  @SerializeOn('emit')
  get isAvailable() {
    const multiplier = new Decimal(1);
    return this.validate({ multiplier });
  }
}
