import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Jobs } from '@/classes/game/actions/jobs';
import { Consumables } from '@/classes/game/actions/consumables';
import { Banking } from '@/classes/game/actions/banking';

@SerializeAllOn('emit')
export class Actions extends Serializable {
  public jobs = new Jobs();

  public consumables = new Consumables();

  public banking = new Banking();
}
