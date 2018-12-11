/* tslint:disable:max-classes-per-file only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import { Container } from './container';
import Decimal from 'decimal.js';

class Stat extends Container {
  readonly default = 50;

  minimum = 0;

  get maximum() {
    return new Decimal(100);
  }
}

describe('stats/container', function() {
  it('sets default value correctly', function() {
    const stat = new Stat();
    expect(stat.value.valueOf()).to.be.equal(new Decimal(50).valueOf());
  });

  it('does not exceed minimum constraint', function() {
    const stat = new Stat();

    stat.mutate(value => value.sub(100));

    expect(stat.value.valueOf()).to.be.equal(new Decimal(0).valueOf());
  });

  it('does not exceed maximum constraint', function() {
    const stat = new Stat();

    stat.mutate(value => value.add(100));

    expect(stat.value.valueOf()).to.be.equal(new Decimal(100).valueOf());
  });

  it('does probe mutation when out of bounds', function() {
    const stat = new Stat();

    expect(stat.probe(value => value.sub(100))).to.be.equal('lessThanMinimum');
    expect(stat.probe(value => value.add(100))).to.be.equal('greaterThanMaximum');
  });
});
