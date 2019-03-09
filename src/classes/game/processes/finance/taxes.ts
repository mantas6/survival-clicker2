import { Action } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { When } from '@/classes/game/base/processes';

@When(process => !!process.actions.incarnation.modules.finance.taxes.isToggledOn)
export class Taxes extends Action {
  taxes = new Mutation(() => this.stats.finance.taxes, () => {
    return new Decimal(0.0005);
  });
}
