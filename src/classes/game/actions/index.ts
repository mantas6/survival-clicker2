import { Serializable, SerializeOn } from '@/classes/game/base/serialization';
import { Jobs } from '@/classes/game/actions/jobs';
import { Consumables } from '@/classes/game/actions/consumables';
import { Banking } from '@/classes/game/actions/banking';

export class Actions extends Serializable {
  @SerializeOn('emit')
  public jobs = new Jobs();

  @SerializeOn('emit')
  public consumables = new Consumables();

  @SerializeOn('emit')
  public banking = new Banking();
}
