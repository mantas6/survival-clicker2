import { SerializableWithReference, SerializeAllOn } from '@/classes/game/base/serialization';
import { TemperatureDiff } from './temperature-diff';

@SerializeAllOn('emit')
export class Thermoregulation extends SerializableWithReference {
  temperatureDiff = new TemperatureDiff();
}
