import { StaminaRestore } from '@/classes/game/processes/stamina-restore';
import { SerializeOn } from '@/classes/game/base/serialization';
import { ProcessContainer } from '@/classes/game/base/processes';

export class Processes extends ProcessContainer {
  @SerializeOn('emit')
  public staminaRestore = new StaminaRestore();
}
