import { Value } from '@/classes/game/base/stats';

export class Medicine extends Value {
  readonly default = 0;

  knowsBasics() {
    return this.value.greaterThanOrEqualTo(0.5);
  }
}
