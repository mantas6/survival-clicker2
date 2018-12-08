import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { UnfairLottery } from './unfair-lottery';
import { LinuxServer } from './linux-server';
import { DatingSite } from './dating-site';

@SerializeAllOn('emit', 'store')
export class InformationTechnology extends Serializable {
  unfairLottery = new UnfairLottery();
  linuxServer = new LinuxServer();
  datingSite = new DatingSite();
}
