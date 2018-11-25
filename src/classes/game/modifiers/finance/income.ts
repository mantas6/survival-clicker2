import { Modifier } from '@/classes/game/base/modifiers';

export class Income extends Modifier {
  compute() {
    return this.stats.finance.investment.value.times(0.1);
  }
}
