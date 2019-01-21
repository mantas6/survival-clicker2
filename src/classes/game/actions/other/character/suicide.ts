import { Action } from '@/classes/game/base/actions';
import { CalculationOptions } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit')
export class Suicide extends Action {
  calculate(opts: CalculationOptions) {
    super.calculate(opts);
    this.state.globals.isDead = true;
  }
}
