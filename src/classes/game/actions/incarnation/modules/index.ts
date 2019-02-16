import { Category } from '@/classes/game/base/actions';
import { Character } from './character';

export class Modules extends Category {
  character = new Character();
}
