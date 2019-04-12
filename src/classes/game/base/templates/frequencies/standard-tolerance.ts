import { Frequency } from '@/classes/game/base/actions';
import Decimal from 'decimal.js';

export class StandardTolerance extends Frequency {
  riseBy() {
    return new Decimal(1);
  }

  fallBy() {
    return new Decimal(1);
  }
}
