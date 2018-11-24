import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { CraftJankyWebsite } from './craft-janky-website';

@SerializeAllOn('emit', 'store')
export class InformationTechnology extends Serializable {
  craftJankyWebsite = new CraftJankyWebsite();
}
