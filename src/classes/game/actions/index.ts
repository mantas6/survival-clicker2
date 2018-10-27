import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Jobs } from '@/classes/game/actions/jobs';
import { Consumables } from '@/classes/game/actions/consumables';
import { Banking } from '@/classes/game/actions/banking';

@SerializeAllOn('emit', 'store')
export class Actions extends Serializable {
  jobs = new Jobs();

  consumables = new Consumables();

  banking = new Banking();
}
