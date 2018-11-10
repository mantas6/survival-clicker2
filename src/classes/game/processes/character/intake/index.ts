import { ProcessContainer } from '@/classes/game/base/processes';
import { Energy } from './energy';
import { Hydration } from './hydration';

export class Intake extends ProcessContainer {
  energy = new Energy();
  hydration = new Hydration();
}
