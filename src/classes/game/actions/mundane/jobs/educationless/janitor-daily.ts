import { ToggleAction, AutoWhenToggled, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { TemperatureMutation } from '@/classes/game/base/templates/mutations/temperature-mutation';

@AutoWhenToggled
@UnlocksWhen(action => action.modifiers.education.school.hasStarted)
export class JanitorDaily extends ToggleAction {
  stamina = new Mutation(() => this.stats.character.stamina, () => {
    return new Decimal(-1);
  });

  temperature = new TemperatureMutation(() => this.stats.character.temperature, () => {
    return new Decimal(0.02);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(1);
  });
}
