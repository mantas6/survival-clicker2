/* tslint:disable:max-classes-per-file only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import { Value } from './value';
import Decimal from 'decimal.js';

class Stat extends Value {
  readonly default = 100;
}

describe('stats/value', function() {
  it('sets default value correctly', function() {
    const stat = new Stat();
    expect(stat.value.toString()).to.be.equal(new Decimal(100).toString());
  });
});
