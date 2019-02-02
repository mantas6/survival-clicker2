import { SerializeOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';
import { Modifier, Effect } from '.';
import { CalculationOptions } from '../mutations';

type ComputeFunction = (opts: CalculationOptions) => Decimal;

interface EffectOptions {
  modifier: () => Modifier;
  value: ComputeFunction;
  duration: () => Decimal.Value;
}

export class TimerEffect extends Effect {
  protected durationFunc: () => Decimal;

  constructor(opts: EffectOptions) {
    super(opts);
    this.durationFunc = () => new Decimal(opts.duration());
  }

  @SerializeOn('emit')
  get duration() {
    return this.durationFunc();
  }
}
