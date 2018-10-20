import { Health } from './health';
import { Energy } from './energy';
import { Hydration } from './hydration';
import { Stamina } from './stamina';
import { Stomach } from './stomach';
import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit', 'store')
export class Character extends Serializable {
  health = new Health();

  stamina = new Stamina();

  energy = new Energy();

  hydration = new Hydration();

  stomach = new Stomach();
}
