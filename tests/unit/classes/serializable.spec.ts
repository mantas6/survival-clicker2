/* tslint:disable:max-classes-per-file only-arrow-functions no-unused-expression */

import { Serializable, SerializeOn, SerializeAs, UnserializeAs } from '@/classes/game/base/serialization';
import { expect } from 'chai';

class ChildClass extends Serializable {
  @SerializeOn('emit')
  @SerializeAs((input: string) => input)
  @UnserializeAs(input => input)
  someText: string = 'someValue';

  @SerializeOn('store')
  @SerializeAs((input: string) => input)
  someTextOnlyToStore: string = 'toStoreValue';

  @SerializeOn('emit')
  get someGetter() {
    return this.someText + 'FromGetter';
  }
}

class ParentClass extends Serializable {
  @SerializeOn('emit', 'store')
  someProperty = new ChildClass();
}

describe('serializable.ts', () => {
  const serializable = new ParentClass();

  it('serializes', () => {
    expect(serializable).has.property('serialize');
    const serialized = serializable.serialize('emit');
    expect(serialized).to.be.not.null;
    expect(serialized).has.property('someProperty');
  });

  // Redo these tests without nested prop?
  it('does not serialize property from other group', () => {
    const serialized = serializable.serialize('emit');
    expect(serialized.someProperty).to.not.have.property('someTextOnlyToStore');
  });

  it('does serialize property from store group', () => {
    const serialized = serializable.serialize('store');
    expect(serialized.someProperty).to.have.property('someTextOnlyToStore').and.be.equal('toStoreValue');
  });

  it('serializes children property correctly', () => {
    const serialized = serializable.serialize('emit');
    expect(serialized.someProperty).property('someText').exist;
    expect(serialized.someProperty).property('someText').equals('someValue');
  });

  it('serializes a defined getter correctly', () => {
    const serialized = serializable.serialize('emit');
    expect(serialized.someProperty).property('someGetter').exist;
    expect(serialized.someProperty).property('someGetter').equals('someValueFromGetter');
  });

  it('unserializes children property correctly', () => {
    serializable.unserialize({ someProperty: { someText: 'unserializedValue' } });
    expect(serializable.someProperty.someText).to.be.equal('unserializedValue');
  });
});
