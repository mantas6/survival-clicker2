import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Stimulants } from './stimulants';

@SerializeAllOn('emit', 'store')
export class Drugs extends Serializable {
  stimulants = new Stimulants();
}
