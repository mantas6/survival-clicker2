import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Morphine } from './morphine';

@SerializeAllOn('emit', 'store')
export class Painkillers extends Serializable {
  morphine = new Morphine();
}
