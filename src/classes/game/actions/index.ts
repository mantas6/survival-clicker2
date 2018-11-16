import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Jobs } from '@/classes/game/actions/jobs';
import { Consumables } from '@/classes/game/actions/consumables';
import { Drugs } from '@/classes/game/actions/drugs';
import { Banking } from '@/classes/game/actions/banking';
import { Education } from '@/classes/game/actions/education';

@SerializeAllOn('emit', 'store')
export class Actions extends Serializable {
  jobs = new Jobs();
  consumables = new Consumables();
  drugs = new Drugs();
  banking = new Banking();
  education = new Education();
}
