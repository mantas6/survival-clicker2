import { StaminaRestore } from './stamina-restore';
import { Digestion } from './digestion';
import { Dehydration } from './dehydration';
import { ProcessContainer } from '@/classes/game/base/processes';

export class Character extends ProcessContainer {
  staminaRestore = new StaminaRestore();
  digestion = new Digestion();
  dehydration = new Dehydration();
}
