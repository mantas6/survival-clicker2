import { Serializable } from '@/classes/game/base/serialization/serializable';
import { Jobs } from '@/classes/game/actions/jobs';

export class Actions extends Serializable {
  public jobs = new Jobs();
}
