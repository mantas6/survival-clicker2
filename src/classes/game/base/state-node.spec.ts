/* tslint:disable:max-classes-per-file only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import { StateNode } from './state-node';

class ParentNode extends StateNode {
  firstChild = new ChildNode();
  secondChild = new ChildNode();
}

class ChildNode extends StateNode {
  nestedChild = new NestedChildNode();
}

class NestedChildNode extends StateNode {

}

describe('state-node', function() {
  it('sets parents correctly', function() {
    const node = new ParentNode();
    node.emitParent();
    expect(node.firstChild.parent).to.be.equal(node);
    expect(node.firstChild.nestedChild.parent).to.be.equal(node.firstChild);
  });

  it('sets paths correctly', function() {
    const node = new ParentNode();
    node.emitParent();
    expect(node.firstChild.path).to.be.equal('firstChild');
    expect(node.firstChild.nestedChild.path).to.be.equal('firstChild.nestedChild');
  });
});
