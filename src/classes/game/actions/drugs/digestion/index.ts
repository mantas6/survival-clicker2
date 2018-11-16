import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { DigestionPills } from './digestion-pills';
import { SyrupOfIpecac } from './syrup-of-ipecac';

@SerializeAllOn('emit', 'store')
export class Digestion extends Serializable {
  digestionPills = new DigestionPills();
  syrupOfIpecac = new SyrupOfIpecac();
}
