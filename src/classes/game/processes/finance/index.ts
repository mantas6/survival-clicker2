import { Investment } from './investment';
import { Taxes } from './taxes';
import { ProcessContainer } from '@/classes/game/base/processes';

export class Finance extends ProcessContainer {
  investment = new Investment();
  taxes = new Taxes();
}
