import { ProcessContainer } from '@/classes/game/base/processes';
import { Heating } from './heating';
import { Cooling } from './cooling';
import { Hyperthermia } from './hyperthermia';
import { Hypothermia } from './hypothermia';

export class Thermoregulation extends ProcessContainer {
  heating = new Heating();
  cooling = new Cooling();

  hyperthermia = new Hyperthermia();
  hypothermia = new Hypothermia();
}
