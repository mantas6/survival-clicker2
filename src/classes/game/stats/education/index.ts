import { School } from './school';
import { DriversLicense } from './drivers-license';
import { Construction } from './construction';
import { InformationTechnology } from './information-technology';
import { BloodTest } from './blood-test';
import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit', 'store')
export class Education extends Serializable {
  school = new School();
  driversLicense = new DriversLicense();
  construction = new Construction();
  informationTechnology = new InformationTechnology();
  bloodTest = new BloodTest();
}
