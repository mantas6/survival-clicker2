import { IgnoreLimits } from '@/classes/game/base/processes';
import { StaminaAction, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { TemperatureMutation } from '@/classes/game/base/templates/mutations/temperature-mutation';

@UnlocksWhen(action => action.modifiers.education.construction.value.greaterThanOrEqualTo(3))
export class StealEquipment extends StaminaAction {
  @IgnoreLimits('lessThanMinimum')
  stamina = new Mutation(() => this.stats.character.stamina, () => {
    return new Decimal(-30);
  });

  temperature = new TemperatureMutation(() => this.stats.character.temperature, () => {
    if (this.actions.incarnation.modules.character.temperature.isToggledOn) {
      return new Decimal(0.1);
    }

    return new Decimal(0);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(150).mul(this.modifiers.education.construction.value.minus(2));
  });
}
