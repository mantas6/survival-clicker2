import { Category } from '@/classes/game/base/actions';
import { Food } from './food';
import { Drinks } from './drinks';

export class Consumables extends Category {
  food = new Food();
  drinks  = new Drinks();
}
