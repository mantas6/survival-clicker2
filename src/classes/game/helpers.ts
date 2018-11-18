import { SerializableWithReference } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

export class Helpers extends SerializableWithReference {
  moneyCost(amount: Decimal.Value): Decimal {
    return this.modifiers.finance.costAdd.value.mul(amount).ceil().negated();
  }

  growth(timesBought: Decimal, baseValue: Decimal, growthAmount: Decimal = new Decimal(1.5)) {
    return new Decimal(baseValue).mul(new Decimal(growthAmount).pow(timesBought));
  }

  growthMoneyCost(timesBought: Decimal, baseValue: Decimal, growthAmount: Decimal = new Decimal(1.5)): Decimal {
    const value = this.growth(timesBought, baseValue, growthAmount);

    return this.moneyCost(value);
  }
}
