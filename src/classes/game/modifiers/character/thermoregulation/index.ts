import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';
import { Insulation } from './insulation';

@SerializeAllOn('emit')
export class Thermoregulation extends SerializableWithReference {
  insulation = new Insulation();
}
