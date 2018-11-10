import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';
import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
export class Intake extends SerializableWithReference {
  energy = new Modifier(cumulated => {
    return new Decimal(0).add(cumulated);
  });

  hydration = new Modifier(cumulated => {
    return new Decimal(0).add(cumulated);
  });
}
