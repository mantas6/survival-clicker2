import { Health } from './health';
import { Energy } from './energy';
import { Hydration } from './hydration';
import { Stamina } from './stamina';
import { Stomach } from './stomach';
import { Serializable, SerializeOn } from '@/classes/game/base/serialization';

export class Character extends Serializable {
  @SerializeOn('emit')
  public health = new Health();

  @SerializeOn('emit')
  public stamina = new Stamina();

  @SerializeOn('emit')
  public energy = new Energy();

  @SerializeOn('emit')
  public hydration = new Hydration();

  @SerializeOn('emit')
  public stomach = new Stomach();
}
