import { Serializable, SerializeOn } from '@/classes/game/base/serialization';

export class Favorite extends Serializable {
  @SerializeOn('emit', 'store')
  favorited = true;
}
