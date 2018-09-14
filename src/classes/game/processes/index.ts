import { StaminaRestore } from '@/classes/game/processes/stamina-restore';
import { StateNode } from '@/classes/game/base/state-node';

export class Processes extends StateNode {
  public staminaRestore = new StaminaRestore();
}
