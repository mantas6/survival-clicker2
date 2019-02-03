import { Category } from '@/classes/game/base/actions';
import { Casual } from './casual';

export class Clothing extends Category {
  casual = new Casual();
}
