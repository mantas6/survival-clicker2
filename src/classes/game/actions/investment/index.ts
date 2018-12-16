import { Banking } from './banking';
import { InformationTechnology } from './information-technology';
import { Category } from '@/classes/game/base/actions';

export class Investment extends Category {
  banking = new Banking();
  informationTechnology = new InformationTechnology();
}
