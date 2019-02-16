import { Category } from '@/classes/game/base/actions';
import { Temperature } from './temperature';

export class Character extends Category {
  temperature = new Temperature();
}
