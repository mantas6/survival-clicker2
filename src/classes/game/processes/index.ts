import { StaminaRestore } from '@/classes/game/processes/stamina-restore';
import { Serializable } from '@/classes/game/base/serialization/serializable';
import { SerializeOn } from '@/classes/game/base/serialization';

export class Processes extends Serializable {
  @SerializeOn('emit')
  public staminaRestore = new StaminaRestore();
}
