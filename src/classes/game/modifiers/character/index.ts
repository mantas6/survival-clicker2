import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';
import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';
import { Intake } from './intake';

@SerializeAllOn('emit')
export class Character extends SerializableWithReference {
  intake = new Intake();

  digestionSpeed = new Modifier(cumulated => {
    return new Decimal(2).add(cumulated);
  });

  staminaRestoreSpeed = new Modifier(cumulated => {
    return new Decimal(1).add(cumulated);
  });

  healthPreservationMultiplier = new Modifier(cumulated => {
    return new Decimal(1).add(cumulated);
  });

  healingSpeed = new Modifier(cumulated => {
    return new Decimal(0.5).add(cumulated);
  });

  concentration = new Modifier(cumulated => {
    return new Decimal(1).add(cumulated);
  });
}
