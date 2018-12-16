import { StateNode } from '@/classes/game/base/state-node';

export function apply<TargetNode extends StateNode>(parentNode: StateNode, applyFunc: (node: TargetNode) => void) {
  for (const { node } of parentNode.nodes()) {
    applyFunc(node as TargetNode);
    apply(node, applyFunc);
  }
}

export function* traverse(parentNode: StateNode): IterableIterator<StateNode> {
  for (const { node } of parentNode.nodes()) {
    // parentNode own properties
    yield node;

    // properties of parentNode children
    yield* traverse(node);
  }
}
