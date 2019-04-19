import { StateNode } from '@/classes/game/base/state-node';

export function* traverse(parentNode: StateNode): IterableIterator<StateNode> {
  for (const { node } of parentNode.nodes()) {
    if (node.shouldTraverse) {
      // parentNode own properties
      yield node;

      // properties of parentNode children
      yield* traverse(node);
    }
  }
}
