import { SerializeAllOn, SerializeOn, SerializeAs } from '@/classes/game/base/serialization';
import { Transformable, Transform } from '@/classes/game/base/transformable';
import { Alive } from './alive';

@SerializeAllOn('emit', 'store')
export class Globals extends Transformable {
  alive = new Alive();

  @Transform('reset', () => false)
  isPaused: boolean = false;

  @SerializeOn('store')
  @SerializeAs(() => process.env.VUE_APP_VERSION)
  version?: string;
}
