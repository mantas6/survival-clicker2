import { Mutation } from '@/classes/game/base/mutations';
import { Temperature } from '@/classes/game/stats/character/temperature';
import { DiffFunction } from '@/classes/game/base/mutations/mutation';

interface MutationOptions {
  stat: () => Temperature;
  value: DiffFunction;
}

export class TemperatureMutation extends Mutation<Temperature> {
  constructor(opts: MutationOptions) {
    super(opts.stat, calcOpts => {
      const multiplyBy = this.modifiers.character.thermoregulation.insulation.value
        .div(100);

      const diff = opts.value(calcOpts);

      if (diff.greaterThan(0)) {
        return diff.mul(multiplyBy);
      } else {
        return diff.div(multiplyBy);
      }
    });
  }
}
