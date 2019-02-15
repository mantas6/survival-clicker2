import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { DigestionPills } from './digestion-pills';
import { Ipecac } from './ipecac';

@SerializeAllOn('emit', 'store')
export class Digestion extends Serializable {
  digestionPills = new DigestionPills();
  ipecac = new Ipecac();
}
