import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';

import { RestoreSpeed } from './restore-speed';
import { RestoreSpeedBoost } from './restore-speed-boost';

@SerializeAllOn('emit')
export class Stamina extends SerializableWithReference {
  restoreSpeed = new RestoreSpeed();
  restoreSpeedBoost = new RestoreSpeedBoost();
}
