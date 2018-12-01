import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';
import { Medicine } from './medicine';
import { InformationTechnology } from './information-technology';
import { Construction } from './construction';
import { BloodTest } from './blood-test';
import { DriversLicense } from './drivers-license';
import { School } from './school';

@SerializeAllOn('emit')
export class Education extends SerializableWithReference {
  medicine = new Medicine();
  informationTechnology = new InformationTechnology();
  construction = new Construction();
  bloodTest = new BloodTest();
  driversLicense = new DriversLicense();
  school = new School();
}
