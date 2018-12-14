import { Character } from './character';
import { Finance } from './finance';
import { ProcessContainer, Process } from '@/classes/game/base/processes';
import { apply } from '@/utils/node';
import { SerializedNode, TagName } from '@/classes/game/base/serialization/serializable';
import { Action } from '@/classes/game//base/actions';

export class Processes extends ProcessContainer {
  character = new Character();
  finance = new Finance();

  serialize(tagName: TagName): SerializedNode | undefined  {
    const processes: Process[] = [];

    apply<Process>(this, node => {
      if (node instanceof Process && !(node instanceof Action)) {
        if (node.isCalculated) {
          processes.push(node);
        }
      }
    });

    const serialized: SerializedNode = {};

    for (const [ index, item ] of processes.entries()) {
      serialized[index] = item.serialize(tagName);
    }

    return serialized;
  }
}
