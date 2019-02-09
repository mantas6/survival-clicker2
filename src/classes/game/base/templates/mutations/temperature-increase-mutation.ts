import { Mutation } from '@/classes/game/base/mutations';
import { Temperature } from '@/classes/game/stats/character/temperature';
import { DiffFunction } from '@/classes/game/base/mutations/mutation';

export class TemperatureIncreaseMutation extends Mutation<Temperature> {
  constructor(statFunc: () => Temperature, diffFunc: DiffFunction) {
    super(statFunc, opts => {
      const multiplyBy = this.modifiers.character.thermoregulation.insulation.value
        .div(1000);

      return diffFunc(opts).mul(multiplyBy);
    });
  }
}
