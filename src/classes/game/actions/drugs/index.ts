import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Stimulants } from './stimulants';
import { Painkillers } from './painkillers';

@SerializeAllOn('emit', 'store')
export class Drugs extends Serializable {
  stimulants = new Stimulants();
  painkillers = new Painkillers();
}
