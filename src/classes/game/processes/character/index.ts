import { StaminaRestore } from './stamina-restore';
import { Digestion } from './digestion';
import { ProcessContainer } from '@/classes/game/base/processes';

export class Character extends ProcessContainer {
  public staminaRestore = new StaminaRestore();
  public digestion = new Digestion();
}
