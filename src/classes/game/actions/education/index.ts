import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Primary } from './primary';
import { Courses } from './courses';

@SerializeAllOn('emit', 'store')
export class Education extends Serializable {
  primary = new Primary();
  courses = new Courses();
}
