import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';

import { PhysicalFitness } from './physical-fitness';

@SerializeAllOn('emit', 'store')
export class Skills extends Serializable {
  physicalFitness = new PhysicalFitness();
}
