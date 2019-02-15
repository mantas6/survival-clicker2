import { Points } from './points';
import { ProcessContainer } from '@/classes/game/base/processes';

export class Incarnation extends ProcessContainer {
  points = new Points();
}
