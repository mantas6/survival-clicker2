/* tslint:disable:max-classes-per-file only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import { Value } from './value';
import Decimal from 'decimal.js';

class Stat extends Value {
  readonly default = 100;

  minimum = 0;
}

describe('stats/value', function() {
  it('sets default value correctly', function() {
    const stat = new Stat();
    expect(stat.value.valueOf()).to.be.equal(new Decimal(100).valueOf());
  });

  it('mutates value correctly', function() {
    const stat = new Stat();

    stat.mutate(value => value.add(100));

    expect(stat.value.valueOf()).to.be.equal(new Decimal(200).valueOf());
  });

  it('does not exceed minimum constraint', function() {
    const stat = new Stat();

    stat.mutate(value => value.sub(200));

    expect(stat.value.valueOf()).to.be.equal(new Decimal(0).valueOf());
  });
});
