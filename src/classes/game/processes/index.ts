import { StaminaRestore } from '@/classes/game/processes/stamina-restore';
import { Digestion } from '@/classes/game/processes/digestion';
import { ProcessContainer } from '@/classes/game/base/processes';

export class Processes extends ProcessContainer {
  public staminaRestore = new StaminaRestore();
  public digestion = new Digestion();
}
