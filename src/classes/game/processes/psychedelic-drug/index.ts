import { Process } from '@/classes/game/base/processes/process';
import { Mutation } from '@/classes/game/base/processes/mutation';
import Decimal from 'decimal.js';
import { Effect } from '@/classes/game/base/effects/effect';
import { Result } from '@/classes/game/processes/psychedelic-drug/result';

export class PsychedelicDrug extends Process {
  public cost = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(-50);
  });

  public result = new Result();
}
