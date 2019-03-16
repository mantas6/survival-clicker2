import { Serializable, SerializeAllOn, SerializeOn } from '@/classes/game/base/serialization';
import { Favorites } from '@/classes/game/actions/mundane/favorites';
import { Jobs } from '@/classes/game/actions/mundane/jobs';
import { Consumables } from '@/classes/game/actions/mundane/consumables';
import { Drugs } from '@/classes/game/actions/mundane/drugs';
import { Investment } from '@/classes/game/actions/mundane/investment';
import { Education } from '@/classes/game/actions/mundane/education';
import { Clothing } from '@/classes/game/actions/mundane/clothing';
import { Skills } from '@/classes/game/actions/mundane/skills';
import { Other } from '@/classes/game/actions/other';

@SerializeAllOn('emit', 'store')
export class Mundane extends Serializable {
  @SerializeOn('emit')
  favorites = new Favorites();

  jobs = new Jobs();
  consumables = new Consumables();
  drugs = new Drugs();
  investment = new Investment();
  education = new Education();
  clothing = new Clothing();

  skills = new Skills();

  @SerializeOn('store')
  other = new Other();
}
