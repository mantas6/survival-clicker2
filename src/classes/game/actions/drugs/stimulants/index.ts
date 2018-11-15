import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { CheapStimulant } from './cheap-stimulant';
import { EnergyDrink } from './energy-drink';
import { DigestionPills } from './digestion-pills';

@SerializeAllOn('emit', 'store')
export class Stimulants extends Serializable {
  energyDrink = new EnergyDrink();
  cheapStimulant = new CheapStimulant();
  digestionPills = new DigestionPills();
}
