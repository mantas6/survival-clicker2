import { Process } from '@/classes/game/base/processes/process';
import { Mutation } from '@/classes/game/base/processes/mutation';
import Decimal from 'decimal.js';

export class StaminaRestore extends Process {
  public drain = new Mutation(() => this.stats.character.health, () => {
    return new Decimal(1);
  });
}
