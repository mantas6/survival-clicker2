import { ProcessContainer } from '@/classes/game/base/processes';
import { TemperatureDiff } from './temperature-diff';

export class Thermoregulation extends ProcessContainer {
  temperatureDiff = new TemperatureDiff();
}
