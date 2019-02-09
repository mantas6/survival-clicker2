import { Mutation } from '@/classes/game/base/mutations';
import { Temperature } from '@/classes/game/stats/character/temperature';
import { DiffFunction } from '@/classes/game/base/mutations/mutation';

interface MutationOptions {
  stat: () => Temperature;
  value: DiffFunction;
  type?: 'increase' | 'decrease';
}

export class TemperatureMutation extends Mutation<Temperature> {
  constructor(opts: MutationOptions) {
    if (!opts.type) {
      opts.type = 'increase';
    }

    super(opts.stat, calcOpts => {
      const multiplyBy = this.modifiers.character.thermoregulation.insulation.value
        .div(100);

      if (opts.type === 'increase') {
        return opts.value(calcOpts).mul(multiplyBy);
      } else {
        return opts.value(calcOpts).div(multiplyBy);
      }
    });
  }
}
