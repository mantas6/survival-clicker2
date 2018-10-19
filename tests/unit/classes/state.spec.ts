/* tslint:disable:max-classes-per-file only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import { State } from '@/classes/game/state';
import { StateNode } from '@/classes/game/base/state-node';
import { Effect } from '@/classes/game/base/effects';
import { Modifier } from '@/classes/game/base/modifiers';

describe('Game State', function() {
  it('does not have an property/class name mismatches', function() {
    const state = new State();

    check(state);

    function check(parent: StateNode) {
      for (const { name, node } of parent.childrenWithNames<StateNode>(entry => entry instanceof StateNode)) {
        if (node instanceof Effect || node instanceof Modifier) {
          continue;
        }

        expect(node.name).to.be.equal(name, `Incorrect naming for ${node.path}`);
        check(node);
      }
    }
  });
});
