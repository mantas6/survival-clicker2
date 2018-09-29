import { Process } from '@/classes/game/base/processes/process';
import { Mutation } from '@/classes/game/base/processes/mutation';
import Decimal from 'decimal.js';
import { Tag } from '@/classes/game/base/serialization';

export class StaminaRestore extends Process {
  @Tag('emit')
  public drain = new Mutation(() => this.stats.character.health, () => {
    return new Decimal(1);
  });
}
