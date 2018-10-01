import { Money } from './money';
import { Serializable, SerializeOn } from '@/classes/game/base/serialization';

export class Finance extends Serializable {
  @SerializeOn('emit')
  public money = new Money();
}
