import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Stimulants } from './stimulants';
import { Painkillers } from './painkillers';
import { Steroids } from './steroids';
import { Digestion } from './digestion';

@SerializeAllOn('emit', 'store')
export class Drugs extends Serializable {
  stimulants = new Stimulants();
  painkillers = new Painkillers();
  steroids = new Steroids();
  digestion = new Digestion();
}
