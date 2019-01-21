import { SerializeAllOn } from '@/classes/game/base/serialization';
import { Transformable, Transform } from '@/classes/game/base/transformable';

@SerializeAllOn('emit', 'store')
export class Globals extends Transformable {
  @Transform('reset', () => false)
  isPaused: boolean = false;

  @Transform('reset', () => true)
  isAlive: boolean = false;
}
