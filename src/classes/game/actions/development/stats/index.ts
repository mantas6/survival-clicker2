import { Category } from '@/classes/game/base/actions';
import { Money } from './money';
import { Points } from './points';

export class Stats extends Category {
  money = new Money();
  points = new Points();
}
