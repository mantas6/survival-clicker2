import { Serializable, SerializeAllOn, SerializeOn } from '@/classes/game/base/serialization';
import { traverse } from '@/utils/node';
import { Action } from '.';

@SerializeAllOn('emit', 'store')
export class Category extends Serializable {
  @SerializeOn('emit')
  get hasUnseen(): true | undefined {
    for (const node of traverse(this)) {
      if (node instanceof Action) {
        if (node.isUnlocked && !node.isSeen) {
          return true;
        }
      }
    }
  }
}
