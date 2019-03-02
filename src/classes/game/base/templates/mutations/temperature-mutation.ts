import { Mutation } from '@/classes/game/base/mutations';
import { Temperature } from '@/classes/game/stats/character/temperature';
import { DiffFunction } from '@/classes/game/base/mutations/mutation';
import Decimal from 'decimal.js';

export class TemperatureMutation extends Mutation<Temperature> {
  constructor(statFunc: () => Temperature, diffFunc: DiffFunction) {
    super(statFunc, calcOpts => {
      if (!this.actions.incarnation.modules.character.temperature.isToggledOn) {
        return new Decimal(0);
      }

      const multiplyBy = this.modifiers.character.thermoregulation.insulation.value
        .div(100);

      const diff = diffFunc(calcOpts);

      if (diff.greaterThan(0)) {
        return diff.mul(multiplyBy);
      } else {
        return diff.div(multiplyBy);
      }
    });
  }
}
