import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { DriversLicense } from './drivers-license';

@SerializeAllOn('emit', 'store')
export class Courses extends Serializable {
  driversLicense = new DriversLicense();
}
