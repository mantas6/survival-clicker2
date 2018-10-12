import { Serializable, SerializeOn } from '@/classes/game/base/serialization';
import { Jobs } from '@/classes/game/actions/jobs';
import { Consumables } from '@/classes/game/actions/consumables';

export class Actions extends Serializable {
  @SerializeOn('emit')
  public jobs = new Jobs();

  @SerializeOn('emit')
  public consumables = new Consumables();
}
