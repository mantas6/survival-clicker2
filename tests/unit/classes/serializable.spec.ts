import { Serializable, Tag, SerializeAs } from '@/classes/game/base/serialization';
import { expect } from 'chai';

class ChildClass extends Serializable {
  @Tag('emit')
  @SerializeAs((input: string) => input)
  public someText: string = 'someValue';
}

class ParentClass extends Serializable {
  @Tag('emit')
  public someProperty = new ChildClass();
}

describe('serializable.ts', () => {
  const ser = new ParentClass();

  it('serializes', () => {
    expect(ser).has.property('serialize');
    const serialized = ser.serialize('emit');
    expect(serialized).to.be.not.null;
    expect(serialized).has.property('someProperty');
  });

  it('serializes children property', () => {
    const serialized = ser.serialize('emit');
    expect(serialized.someProperty).property('someText').exist;
    expect(serialized.someProperty).property('someText').equals('someValue');
  });
});
