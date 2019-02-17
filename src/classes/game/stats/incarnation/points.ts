import { Value, Persist } from '@/classes/game/base/stats';

@Persist
export class Points extends Value {
  readonly default = 0;
}
