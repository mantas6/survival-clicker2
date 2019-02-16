import { Category } from '@/classes/game/base/actions';
import { Temperature } from './temperature';

export class Modules extends Category {
  temperature = new Temperature();
}
