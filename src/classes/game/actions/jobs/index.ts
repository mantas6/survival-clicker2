import { Serializable } from '@/classes/game/base/serialization/serializable';
import { Janitor } from './janitor';

export class Jobs extends Serializable {
  public janitor = new Janitor();
}
