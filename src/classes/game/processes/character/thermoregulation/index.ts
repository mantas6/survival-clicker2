import { ProcessContainer } from '@/classes/game/base/processes';
import { Heating } from './heating';
import { Cooling } from './cooling';

export class Thermoregulation extends ProcessContainer {
  heating = new Heating();
  cooling = new Cooling();
}
