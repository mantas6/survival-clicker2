import { StateReference } from '@/classes/game/base/state-reference';
import { State } from '@/classes/game/state';
import { Stats } from '@/classes/game/stats';
import { Implements } from '@/utils/implements';

@Implements(StateReference)
export class SerializableWithReference extends StateReference implements StateReference {
  public state!: State;
  public stats!: Stats;
}
