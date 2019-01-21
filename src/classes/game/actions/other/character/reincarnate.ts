import { Action } from '@/classes/game/base/actions';
import { CalculationOptions } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import { traverse } from '@/utils/node';
import { Transformable } from '@/classes/game/base/transformable';

@SerializeAllOn('emit')
export class Reincarnate extends Action {
  calculate(opts: CalculationOptions) {
    super.calculate(opts);
    this.reset();
  }

  private reset() {
    for (const node of traverse(this.state)) {
      if (node instanceof Transformable) {
        node.transform('reset');
      }
    }
  }
}
