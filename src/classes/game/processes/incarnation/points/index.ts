import { Income } from './income';
import { ProcessContainer } from '@/classes/game/base/processes';

export class Points extends ProcessContainer {
  income = new Income();
}
