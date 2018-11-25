import { Modifier } from '@/classes/game/base/modifiers';

export class Taxes extends Modifier {
  compute() {
    return this.stats.finance.taxes.value.add(1);
  }
}
