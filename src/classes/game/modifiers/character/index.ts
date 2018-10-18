import { SerializableWithReference } from '@/classes/game/base/serialization';
import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

export class Character extends SerializableWithReference {
  digestionSpeed = new Modifier(() => {
    return new Decimal(2);
  });
}
