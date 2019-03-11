import { Measure } from '@/classes/game/base/modifiers';
import { traverse } from '@/utils/node';
import Decimal from 'decimal.js';
import { ToggleAction } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { Money } from '@/classes/game/stats/finance/money';

interface WithMoneyMutation extends ToggleAction {
  money: Mutation<Money>;
}

function hasMoneyMutation(node: ToggleAction): node is WithMoneyMutation {
  return (node as WithMoneyMutation).money !== undefined;
}

export class Income extends Measure {
  compute() {
    let sum = new Decimal(0);

    for (const node of traverse(this.state)) {
      if (node instanceof ToggleAction) {
        if (node.isAutoWhenToggled && node.isToggledOn && hasMoneyMutation(node)) {
          sum = sum.add(node.money.diff);
        }
      }
    }

    // Add investments
    sum = sum.add(this.modifiers.finance.income.value);

    return sum;
  }
}
