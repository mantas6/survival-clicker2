import { Money } from './money';
import { Serializable, Tag } from '@/classes/game/base/serializable';

export class Finance extends Serializable {
  @Tag('emit')
  public money = new Money();
}
