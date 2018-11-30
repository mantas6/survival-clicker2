import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { JankyWebsite } from './janky-website';
import { ResponsiveWebsite } from './responsive-website';
import { ReactApp } from './react-app';

@SerializeAllOn('emit', 'store')
export class InformationTechnology extends Serializable {
  jankyWebsite = new JankyWebsite();
  responsiveWebsite = new ResponsiveWebsite();
  reactApp = new ReactApp();
}
