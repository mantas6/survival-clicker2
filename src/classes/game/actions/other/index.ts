import { Category } from '@/classes/game/base/actions';
import { Character } from './character';
import { Skills } from './skills';

export class Other extends Category {
  character = new Character();
  skills = new Skills();
}
