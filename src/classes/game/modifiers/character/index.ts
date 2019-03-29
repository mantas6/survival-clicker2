import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';
import { Intake } from './intake';
import { DigestionSpeed } from './digestion-speed';
import { HealthPreservationMultiplier } from './health-preservation-multiplier';
import { HealingSpeed } from './healing-speed';
import { Concentration } from './concentration';
import { Thermoregulation } from './thermoregulation';
import { Regeneration } from './regeneration';

@SerializeAllOn('emit')
export class Character extends SerializableWithReference {
  intake = new Intake();
  thermoregulation = new Thermoregulation();
  regeneration = new Regeneration();

  digestionSpeed = new DigestionSpeed();
  healthPreservationMultiplier = new HealthPreservationMultiplier();
  healingSpeed = new HealingSpeed();
  concentration = new Concentration();
}
