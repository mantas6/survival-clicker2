import { Money } from './money';
import { Investment } from './investment';
import { Taxes } from './taxes';
import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit')
export class Finance extends Serializable {
  public money = new Money();

  public investment = new Investment();

  public taxes = new Taxes();
}
