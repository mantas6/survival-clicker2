import { Category } from '@/classes/game/base/actions';
import { Interaction } from './interaction';

export class Automation extends Category {
  interaction = new Interaction();
}
