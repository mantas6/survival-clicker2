import { IgnoreLimits } from '@/classes/game/base/processes';
import { Action, VisibleWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
@VisibleWhen(action => action.stats.education.driversLicense.value.greaterThan(0))
export class PizzaDeliveryDriver extends Action {
  @IgnoreLimits('lessThanMinimum')
  stamina = new Mutation(() => this.stats.character.stamina, () => {
    return new Decimal(-3);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(15);
  });
}
