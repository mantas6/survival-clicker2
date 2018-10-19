import { SerializableWithReference } from '@/classes/game/base/serialization';
import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

export class Finance extends SerializableWithReference {
  moneyGain = new Modifier(() => {
    return this.stats.finance.investment.value.times(0.1);
  });
}
