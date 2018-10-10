import { Serializable, SerializeOn } from '@/classes/game/base/serialization';
import { Jobs } from '@/classes/game/actions/jobs';

export class Actions extends Serializable {
  @SerializeOn('emit')
  public jobs = new Jobs();
}
