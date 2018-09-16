import { Money } from './money';
import { Serializable } from '@/classes/game/base/serializable';

export class Finance extends Serializable {
  public money = new Money();
}
