import { ProcessContainer } from '@/classes/game/base/processes';
import { Heating } from './heating';
import { Cooling } from './cooling';
import { Dissipation } from './dissipation';
import { Hyperthermia } from './hyperthermia';
import { Hypothermia } from './hypothermia';
import { Hyperpyrexia } from './hyperpyrexia';

export class Thermoregulation extends ProcessContainer {
  heating = new Heating();
  cooling = new Cooling();

  dissipation = new Dissipation();

  hyperthermia = new Hyperthermia();
  hypothermia = new Hypothermia();
  hyperpyrexia = new Hyperpyrexia();

  validate() {
    return this.actions.incarnation.modules.character.temperature.isToggledOn || false;
  }
}
