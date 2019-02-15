import { Category } from '@/classes/game/base/actions';
import { Primary } from './primary';
import { Secondary } from './secondary';
import { Courses } from './courses';

export class Education extends Category {
  primary = new Primary();
  secondary = new Secondary();
  courses = new Courses();
}
