import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Underwear } from './underwear';
import { WarmClothing } from './warm-clothing';

@SerializeAllOn('emit', 'store')
export class Casual extends Serializable {
  underwear = new Underwear();
  warmClothing = new WarmClothing();
}
