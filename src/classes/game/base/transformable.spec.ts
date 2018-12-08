/* tslint:disable:max-classes-per-file only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import { Transformable, Transform } from './transformable';

class TestingClass extends Transformable {
  @Transform('reset', () => undefined)
  propToReset = true;

  someOtherProp = 'someValue';
}

describe('transformable', function() {
  it('transforms a correct value', function() {
    const item = new TestingClass();

    item.transform('reset');

    expect(item.propToReset).to.be.equal(undefined);
    expect(item.someOtherProp).to.be.equal('someValue');
  });

  it('does not transform a different tag property', function() {
    const item = new TestingClass();

    item.transform('test');

    expect(item.propToReset).to.be.equal(true);
    expect(item.someOtherProp).to.be.equal('someValue');
  });
});
