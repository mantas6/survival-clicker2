import { Money } from './money';
import { Investment } from './investment';
import { Taxes } from './taxes';
import { Serializable, SerializeOn } from '@/classes/game/base/serialization';

export class Finance extends Serializable {
  @SerializeOn('emit')
  public money = new Money();

  @SerializeOn('emit')
  public investment = new Investment();

  @SerializeOn('emit')
  public taxes = new Taxes();
}
