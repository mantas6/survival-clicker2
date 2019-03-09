import { Category } from '@/classes/game/base/actions';
import { Character } from './character';
import { Finance } from './finance';

export class Modules extends Category {
  character = new Character();
  finance = new Finance();
}
