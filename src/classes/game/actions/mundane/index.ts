import { SerializeAllOn, SerializeOn, SerializableWithReference } from '@/classes/game/base/serialization';
import { Favorites } from './favorites';
import { Jobs } from './jobs';
import { Consumables } from './consumables';
import { Drugs } from './drugs';
import { Investment } from './investment';
import { Education } from './education';
import { Clothing } from './clothing';
import { Skills } from './skills';

@SerializeAllOn('emit', 'store')
export class Mundane extends SerializableWithReference {
  @SerializeOn('emit')
  favorites = new Favorites();

  jobs = new Jobs();
  consumables = new Consumables();
  drugs = new Drugs();
  investment = new Investment();
  education = new Education();
  clothing = new Clothing();

  skills = new Skills();

  get shouldTraverse() {
    return this.state.globals.alive.value;
  }

  get shouldSerializeOnEmit() {
    return this.state.globals.alive.value;
  }
}
