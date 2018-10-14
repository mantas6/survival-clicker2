import { Health } from './health';
import { Energy } from './energy';
import { Hydration } from './hydration';
import { Stamina } from './stamina';
import { Stomach } from './stomach';
import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit')
export class Character extends Serializable {
  public health = new Health();

  public stamina = new Stamina();

  public energy = new Energy();

  public hydration = new Hydration();

  public stomach = new Stomach();
}
