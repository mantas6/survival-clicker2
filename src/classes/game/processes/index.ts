import { StaminaRestore } from '@/classes/game/processes/stamina-restore';
import { Serializable } from '@/classes/game/base/serialization/serializable';
import { Tag } from '@/classes/game/base/serialization';

export class Processes extends Serializable {
  @Tag('emit')
  public staminaRestore = new StaminaRestore();
}
