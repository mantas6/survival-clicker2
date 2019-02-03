import { IgnoreLimits } from '@/classes/game/base/processes';
import { StaminaAction } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

export class Janitor extends StaminaAction {
  @IgnoreLimits('lessThanMinimum')
  stamina = new Mutation(() => this.stats.character.stamina, () => {
    return new Decimal(-5);
  });

  temperature = new Mutation(() => this.stats.character.temperature, () => {
    return new Decimal(0.1);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(5);
  });
}
