import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';
import { Intake } from './intake';
import { DigestionSpeed } from './digestion-speed';
import { StaminaRestoreSpeed } from './stamina-restore-speed';
import { HealthPreservationMultiplier } from './health-preservation-multiplier';
import { HealingSpeed } from './healing-speed';
import { Concentration } from './concentration';

@SerializeAllOn('emit')
export class Character extends SerializableWithReference {
  intake = new Intake();

  digestionSpeed = new DigestionSpeed();
  staminaRestoreSpeed = new StaminaRestoreSpeed();
  healthPreservationMultiplier = new HealthPreservationMultiplier();
  healingSpeed = new HealingSpeed();
  concentration = new Concentration();
}
