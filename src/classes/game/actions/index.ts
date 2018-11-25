import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Jobs } from '@/classes/game/actions/jobs';
import { Consumables } from '@/classes/game/actions/consumables';
import { Drugs } from '@/classes/game/actions/drugs';
import { Investment } from '@/classes/game/actions/investment';
import { Education } from '@/classes/game/actions/education';

@SerializeAllOn('emit', 'store')
export class Actions extends Serializable {
  jobs = new Jobs();
  consumables = new Consumables();
  drugs = new Drugs();
  investment = new Investment();
  education = new Education();
}
