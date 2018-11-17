import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Primary } from './primary';
import { Secondary } from './secondary';
import { Courses } from './courses';

@SerializeAllOn('emit', 'store')
export class Education extends Serializable {
  primary = new Primary();
  secondary = new Secondary();
  courses = new Courses();
}
