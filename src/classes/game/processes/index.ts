import { StaminaRestore } from '@/classes/game/processes/stamina-restore';
import { Serializable } from '@/classes/game/base/serialization/serializable';

export class Processes extends Serializable {
  public staminaRestore = new StaminaRestore();
}
