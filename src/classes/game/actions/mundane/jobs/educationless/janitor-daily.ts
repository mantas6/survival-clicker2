import { IgnoreLimits } from '@/classes/game/base/processes';
import { ToggleAction, AutoWhenToggled } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { TemperatureMutation } from '@/classes/game/base/templates/mutations/temperature-mutation';

@AutoWhenToggled
export class JanitorDaily extends ToggleAction {
  @IgnoreLimits('lessThanMinimum')
  stamina = new Mutation(() => this.stats.character.stamina, () => {
    return new Decimal(-1);
  });

  temperature = new TemperatureMutation(() => this.stats.character.temperature, () => {
    return new Decimal(0.02);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(1);
  });

  get canToggleOn(): boolean {
    return !this.isToggledOn;
  }
}
