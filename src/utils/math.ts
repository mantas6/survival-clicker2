import Decimal from 'decimal.js';

export function growth(timesBought: Decimal.Value, baseValue: Decimal.Value, growthAmount: Decimal.Value) {
  return new Decimal(baseValue).mul(new Decimal(growthAmount).pow(timesBought));
}
