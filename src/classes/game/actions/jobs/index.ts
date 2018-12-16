import { Category } from '@/classes/game/base/actions';
import { Educationless } from './educationless';
import { Donor } from './donor';
import { InformationTechnology } from './information-technology';
import { Construction } from './construction';

export class Jobs extends Category {
  educationless = new Educationless();
  informationTechnology = new InformationTechnology();
  construction = new Construction();
  donor = new Donor();
}
