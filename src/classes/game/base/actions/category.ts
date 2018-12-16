import { Serializable, SerializeAllOn, SerializeOn } from '@/classes/game/base/serialization';
import { apply } from '@/utils/node';
import { Action } from '.';

@SerializeAllOn('emit', 'store')
export class Category extends Serializable {
  @SerializeOn('emit')
  get hasUnseen(): true | undefined {
    let has;

    apply(this, node => {
      if (node instanceof Action) {
        if (node.isUnlocked && !node.isSeen) {
          has = true;
        }
      }
    });

    return has;
  }
}
