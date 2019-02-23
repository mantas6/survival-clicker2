import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Fitness } from './fitness';

@SerializeAllOn('emit', 'store')
export class Skills extends Serializable {
  fitness = new Fitness();
}
