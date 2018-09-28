import { Effect, Duration, Group } from '@/classes/game/base/effects';
import { Mutation } from '@/classes/game/base/processes/mutation';
import Decimal from 'decimal.js';

export class Result extends Effect {
  @Duration(() => new Decimal(10))
  @Group(1)
  public start = new Mutation(() => this.stats.character.health, () => {
    return new Decimal(-10);
  });

  @Duration(() => new Decimal(20))
  @Group(2)
  public withdrawal = new Mutation(() => this.stats.character.health, () => {
    return new Decimal(-1);
  });
}
