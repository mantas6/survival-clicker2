import { SerializableWithReference } from '@/classes/game/base/serialization';
import { SerializedNode, TagName } from '@/classes/game/base/serialization/serializable';
import { traverse } from '@/utils/node';
import { Action } from '@/classes/game/base/actions';

export class Favorites extends SerializableWithReference {
  serialize(tagName: TagName): SerializedNode | undefined {
    const serialized: SerializedNode = {};

    let hasFavorited = false;

    for (const node of traverse(this.actions)) {
      if (node instanceof Action) {
        if (node.favorite) {
          const category = node.parent!.parent!;

          if (!serialized[category.name]) {
            serialized[category.name] = {};
          }

          (serialized[category.name] as any)[node.name] = node.serialize(tagName);

          hasFavorited = true;
        }
      }
    }

    if (!hasFavorited) {
      return undefined;
    }

    return serialized;
  }
}
