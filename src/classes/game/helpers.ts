import { SerializableWithReference } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

export class Helpers extends SerializableWithReference {
  moneyCost(amount: Decimal.Value): Decimal {
    return this.modifiers.finance.taxes.value.mul(amount).ceil().negated();
  }

  growth(timesBought: Decimal.Value, baseValue: Decimal.Value, growthAmount: Decimal.Value) {
    return new Decimal(baseValue).mul(new Decimal(growthAmount).pow(timesBought));
  }

  growthMoneyCost(timesBought: Decimal.Value, baseValue: Decimal.Value, growthAmount: Decimal.Value): Decimal {
    const value = this.growth(timesBought, baseValue, growthAmount);

    return this.moneyCost(value);
  }
}
