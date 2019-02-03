import { SerializeOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { Effect } from '.';
import { EffectOptions } from './effect';

interface TimerEffectOptions extends EffectOptions {
  duration: () => Decimal.Value;
}

export class TimerEffect extends Effect {
  protected durationFunc: () => Decimal;

  constructor(opts: TimerEffectOptions) {
    super(opts);
    this.durationFunc = () => new Decimal(opts.duration());
  }

  @SerializeOn('emit')
  get duration() {
    return this.durationFunc();
  }
}
