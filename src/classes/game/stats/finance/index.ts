import { Money } from './money';
import { Serializable, Tag } from '@/classes/game/base/serialization';

export class Finance extends Serializable {
  @Tag('emit')
  public money = new Money();
}
