import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Adderall } from './adderall';
import { EnergyDrink } from './energy-drink';
import { Coffee } from './coffee';

@SerializeAllOn('emit', 'store')
export class Stimulants extends Serializable {
  coffee = new Coffee();
  energyDrink = new EnergyDrink();
  adderall = new Adderall();
}
