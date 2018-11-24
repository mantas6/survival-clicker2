import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { CraftJankyWebsite } from './craft-janky-website';
import { CraftResponsiveWebsite } from './craft-responsive-website';
import { CreateReactApp } from './create-react-app';

@SerializeAllOn('emit', 'store')
export class InformationTechnology extends Serializable {
  craftJankyWebsite = new CraftJankyWebsite();
  craftResponsiveWebsite = new CraftResponsiveWebsite();
  createReactApp = new CreateReactApp();
}
