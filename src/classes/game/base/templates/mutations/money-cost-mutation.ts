import { Mutation } from '@/classes/game/base/mutations';
import { DiffFunction } from '@/classes/game/base/mutations/mutation';
import { Money } from '@/classes/game/stats/finance/money';

export class MoneyCostMutation extends Mutation<Money> {
  constructor(statFunc: () => Money, diffFunc: DiffFunction) {
    super(statFunc, opts => {
      const multiplyBy = this.modifiers.finance.taxes.value;

      return diffFunc(opts).mul(multiplyBy).ceil().negated();
    });
  }
}
