import { Serializable, SerializeOn } from '@/classes/game/base/serialization';
import { Queued } from '@/classes/game/base/automation';

export class Favorite extends Serializable {
  @SerializeOn('emit', 'store')
  queued?: Queued;

  @SerializeOn('emit', 'store')
  favorited = true;
}
