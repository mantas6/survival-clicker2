import { Action } from '@/classes/game/base/actions';
import { CalculationOptions } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import { Transformable, applyReset } from '@/classes/game/base/transformable';

@SerializeAllOn('emit')
export class Reincarnate extends Action {
  calculate(opts: CalculationOptions) {
    super.calculate(opts);
    applyReset(this.state);
  }
}
