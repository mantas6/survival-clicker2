import { Money } from './money';
import { Investment } from './investment';
import { Taxes } from './taxes';
import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit', 'store')
export class Finance extends Serializable {
  money = new Money();

  investment = new Investment();

  taxes = new Taxes();
}
