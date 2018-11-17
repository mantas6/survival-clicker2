import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { DriversLicense } from './drivers-license';
import { BloodTest } from './blood-test';

@SerializeAllOn('emit', 'store')
export class Courses extends Serializable {
  driversLicense = new DriversLicense();
  bloodTest = new BloodTest();
}
