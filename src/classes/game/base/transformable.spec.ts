/* tslint:disable:max-classes-per-file only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import { Transformable, Transform } from './transformable';

class TestingClass extends Transformable {
  @Transform('reset', () => undefined)
  valueToReset = true;
}

describe('transformable', function() {
  it('transforms a value', function() {
    const item = new TestingClass();

    item.transform('reset');

    expect(item.valueToReset).to.be.equal(undefined);
  });
});
