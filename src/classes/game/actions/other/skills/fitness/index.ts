import { Category } from '@/classes/game/base/actions';
import { Stamina } from './stamina';

export class Fitness extends Category {
  stamina = new Stamina();
}
