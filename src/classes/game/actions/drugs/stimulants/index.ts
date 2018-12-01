import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { CheapStimulant } from './cheap-stimulant';
import { EnergyDrink } from './energy-drink';
import { Coffee } from './coffee';
import { Modafinil } from './modafinil';

@SerializeAllOn('emit', 'store')
export class Stimulants extends Serializable {
  coffee = new Coffee();
  energyDrink = new EnergyDrink();
  cheapStimulant = new CheapStimulant();
  modafinil = new Modafinil();
}
