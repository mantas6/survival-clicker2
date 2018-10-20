import { Calculable } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';
import { SerializableWithReference } from '@/classes/game/base/serialization';
import { Timer } from './timer';

export class Timers extends SerializableWithReference {
  protected items: Timer[] = [];

  push(calculable: Calculable, duration: Decimal) {
    this.items.push(new Timer(calculable, duration));
  }

  calculate() {
    const multiplier = this.state.timeMultiplier;

    for (const item of this.items) {
      item.calculate({ multiplier });
    }

    this.items = this.items.filter(item => !item.hasTimedOut());
  }
}
