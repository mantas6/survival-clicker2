import { Category } from '@/classes/game/base/actions';
import { Casual } from './casual';
import { TagName } from '@/classes/game/base/serialization/serializable';

export class Clothing extends Category {
  casual = new Casual();

  serialize(tagName: TagName) {
    if (this.actions.incarnation.modules.character.temperature.isCalculatedOnce) {
      return super.serialize(tagName);
    }
  }
}
