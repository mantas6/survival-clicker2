import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';
import { Energy } from './energy';
import { Hydration } from './hydration';

@SerializeAllOn('emit')
export class Intake extends SerializableWithReference {
  energy = new Energy();
  hydration = new Hydration();
}
