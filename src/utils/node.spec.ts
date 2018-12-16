/* tslint:disable:max-classes-per-file only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import { traverse } from './node';
import { StateNode } from '@/classes/game/base/state-node';

class ParentNode extends StateNode {
  childNode = new ChildNode();
}

class ChildNode extends StateNode {
  nestedChildNode = new NestedChildNode();
}

class NestedChildNode extends StateNode {

}

describe('Node utilities', () => {
  it('iterates though nodes correctly', () => {
    const parentNode = new ParentNode();
    parentNode.emitParent();

    const nodes = Array.from(traverse(parentNode));

    expect(nodes[0].name).to.be.equal('childNode');
    expect(nodes[1].name).to.be.equal('nestedChildNode');
  });
});
