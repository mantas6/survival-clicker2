import { IgnoreLimits } from '@/classes/game/base/processes';
import { StaminaAction, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { TemperatureIncreaseMutation } from '@/classes/game/base/templates/mutations/temperature-increase-mutation';

@UnlocksWhen(action => action.modifiers.education.driversLicense.value.greaterThan(0))
export class PizzaDelivery extends StaminaAction {
  @IgnoreLimits('lessThanMinimum')
  stamina = new Mutation(() => this.stats.character.stamina, () => {
    return new Decimal(-3);
  });

  temperature = new TemperatureIncreaseMutation(() => this.stats.character.temperature, () => {
    return new Decimal(0.1);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(15);
  });
}
