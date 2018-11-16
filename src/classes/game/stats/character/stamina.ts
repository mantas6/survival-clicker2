import { Container } from '@/classes/game/base/stats';
import Decimal from 'decimal.js';

export class Stamina extends Container {
  readonly default = 100;

  get maximum() {
    return new Decimal(100);
  }

  protected onLessThanMinimum() {
    const loss = new Decimal(5).div(this.modifiers.character.healthPreservationMultiplier.value);
    this.stats.character.health.mutate(value => value.minus(loss));
  }
}
