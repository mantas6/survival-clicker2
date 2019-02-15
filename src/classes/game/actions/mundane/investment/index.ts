import { Banking } from './banking';
import { InformationTechnology } from './information-technology';
import { Government } from './government';
import { Category } from '@/classes/game/base/actions';

export class Investment extends Category {
  banking = new Banking();
  informationTechnology = new InformationTechnology();
  government = new Government();
}
