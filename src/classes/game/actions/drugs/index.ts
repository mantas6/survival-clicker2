import { Category } from '@/classes/game/base/actions';
import { Stimulants } from './stimulants';
import { Painkillers } from './painkillers';
import { Steroids } from './steroids';
import { Digestion } from './digestion';

export class Drugs extends Category {
  stimulants = new Stimulants();
  painkillers = new Painkillers();
  steroids = new Steroids();
  digestion = new Digestion();
}
