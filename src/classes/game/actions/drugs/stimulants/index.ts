import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { CheapStimulant } from './cheap-stimulant';

@SerializeAllOn('emit', 'store')
export class Stimulants extends Serializable {
  cheapStimulant = new CheapStimulant();
}
